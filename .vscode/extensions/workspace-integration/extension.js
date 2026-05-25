const vscode = require('vscode');
const http = require('http');
const url = require('url');
const path = require('path');

vscode.window.showInformationMessage('Workspace Integration Loaded!');

module.exports.activate = function(context) {
  vscode.window.showInformationMessage('Workspace Integration Activated!');
  
  // Track current decorations for the call stack
  let currentDecorations = []; // Array of { editor, decoration }
  let decorationTimeout = null;
  
  const server = http.createServer(async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    try {
      const parsedUrl = url.parse(req.url, true);
      const query = parsedUrl.query;
      
      let action, stack;
      
      if (req.method === 'GET') {
        action = query.action;
        // For GET, expect file and line, convert to single-item stack for backwards compatibility
        const file = query.file;
        const line = parseInt(query.line);
        
        if (!file || !line || !action) {
          res.writeHead(400);
          res.end('Missing params: action, file, line');
          return;
        }
        
        stack = [{ file, line }];
        
      } else if (req.method === 'POST') {
        let data = '';
        req.on('data', chunk => data += chunk);
        req.on('end', async () => {
          const body = JSON.parse(data);
          action = body.action;
          stack = body.stack; // Expect array of { file, line } objects
          
          if (!action || !Array.isArray(stack)) {
            res.writeHead(400);
            res.end('Missing params: action (string), stack (array)');
            return;
          }
          
          if (action === 'highlight') {
            await vscode.commands.executeCommand('workspace-integration.highlight', stack);
          } else if (action === 'breakpoint') {
            // For breakpoint, use the first (deepest) item in the stack
            const deepest = stack[0];
            await vscode.commands.executeCommand('workspace-integration.breakpoint', deepest.file, deepest.line);
          }
          
          res.writeHead(200);
          res.end('OK');
        });
        return;
        
      } else {
        res.writeHead(405);
        res.end('Method not allowed');
        return;
      }
      
      // Handle GET requests
      if (action === 'highlight') {
        await vscode.commands.executeCommand('workspace-integration.highlight', stack);
      } else if (action === 'breakpoint') {
        await vscode.commands.executeCommand('workspace-integration.breakpoint', stack[0].file, stack[0].line);
      }
      
      res.writeHead(200);
      res.end('OK');
      
    } catch (err) {
      vscode.window.showErrorMessage('Error: ' + err.message);
      res.writeHead(400);
      res.end('Error: ' + err.message);
    }
  });

  server.listen(3333, () => {
    vscode.window.showInformationMessage('Server listening on 3333');
  });

  // Helper to resolve file path relative to workspace
  function resolveFilePath(filePath) {
    const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
    if (!workspaceFolder) {
      throw new Error('No workspace open');
    }
    
    return path.isAbsolute(filePath) 
      ? filePath 
      : path.join(workspaceFolder.uri.fsPath, filePath);
  }

  // Clear all current decorations
  function clearAllDecorations() {
    currentDecorations.forEach(({ editor, decoration }) => {
      try {
        editor.setDecorations(decoration, []);
      } catch (err) {
        // Editor may have been closed
      }
    });
    currentDecorations = [];
    if (decorationTimeout) {
      clearTimeout(decorationTimeout);
      decorationTimeout = null;
    }
  }

  // Highlight command - now accepts an array of stack frames
  let highlight = vscode.commands.registerCommand('workspace-integration.highlight', async (stack) => {
    // Clear old decorations immediately
    clearAllDecorations();
  
    
    // Process each stack frame
    for (let i = 0; i < stack.length; i++) {
      const { file, line } = stack[i];
      
      try {
        const absolutePath = resolveFilePath(file);
        const uri = vscode.Uri.file(absolutePath);
        
        // Find editor with this file
        let editor = vscode.window.visibleTextEditors.find(ed => ed.document.uri.fsPath === absolutePath);
        
        if (!editor) continue; // Skip if file not open
        
        const lineRange = editor.document.lineAt(line - 1).range;
        const borderColor = i === 0 ? 'red' : 'orange'; // Deepest is red, others orange
        
        const decoration = vscode.window.createTextEditorDecorationType({
          backgroundColor: i?'none':'rgba(100, 255, 100, 0.2)',
          border: i?'2px dashed green':'2px solid green',
          isWholeLine: true,
          gutterIconPath: undefined,
          /*after: {
            contentText: ` [Stack ${i}]`,
            color: 'rgba(0, 0, 0, 0.6)',
            margin: '0 0 0 1em',
          }*/
        });
        
        editor.setDecorations(decoration, [lineRange]);
        
        // Track decorations
        currentDecorations.push({ editor, decoration });
        
      } catch (err) {
        console.error(`Failed to highlight ${file}:${line}`, err);
      }
    }
    
    // Auto-clear after 5 seconds
    if (decorationTimeout) {
      clearTimeout(decorationTimeout);
    }
    decorationTimeout = setTimeout(() => {
      clearAllDecorations();
    }, 5000);
  });

  // Breakpoint command
  let breakpoint = vscode.commands.registerCommand('workspace-integration.breakpoint', async (filePath, lineNum) => {
    const absolutePath = resolveFilePath(filePath);
    const uri = vscode.Uri.file(absolutePath);
    const doc = await vscode.workspace.openTextDocument(uri);
    
    const session = vscode.debug.activeDebugSession;
    if (!session) {
      vscode.window.showErrorMessage('No active debug session. Start debugging first.');
      return;
    }
    
    await session.customRequest('setBreakpoints', {
      source: { path: absolutePath },
      breakpoints: [{ line: lineNum }]
    });
    
    vscode.window.showInformationMessage(`Breakpoint set at ${filePath}:${lineNum}`);
  });

  context.subscriptions.push(highlight, breakpoint);
};

module.exports.deactivate = function() {};