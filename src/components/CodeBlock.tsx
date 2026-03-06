import React, { useState } from 'react';
import { Copy, Check, Terminal } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ code, language = 'javascript' }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group rounded-lg border border-slate-700 bg-space-900 overflow-hidden shadow-2xl">
      <div className="flex items-center justify-between px-4 py-2 bg-slate-800/50 border-b border-slate-700">
        <div className="flex items-center space-x-2">
          <Terminal size={14} className="text-gold-500" />
          <span className="text-xs font-mono text-slate-400">{language === 'kotlin' ? 'MainActivity.kt' : language === 'xml' ? 'AndroidManifest.xml' : 'userscript.js'}</span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center space-x-1.5 px-2 py-1 rounded hover:bg-slate-700 transition-colors text-xs font-medium text-slate-300"
        >
          {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
          <span>{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>
      <div className="p-4 overflow-x-auto max-h-[600px] scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
        <pre className="text-xs font-mono leading-relaxed text-slate-300">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
};