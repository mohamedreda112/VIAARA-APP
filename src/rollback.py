import json
import os

log_file = r'C:\Users\Mo_Reda\.gemini\antigravity-ide\brain\37f65914-ed08-4c36-87b5-a4ebd16d718b\.system_generated\logs\transcript.jsonl'

with open(log_file, 'r', encoding='utf-8') as f:
    lines = f.readlines()

changes = []
styles_content = None

for line in lines:
    try:
        data = json.loads(line)
        step = data.get('step_index', 0)
        
        # Track styles.css state before step 162
        if step <= 162 and data.get('source') == 'SYSTEM' and data.get('type') == 'TOOL_RESPONSE':
            content = data.get('content', '')
            if 'styles.css' in content and 'File Path:' in content and 'The following code has been modified to include a line number' in content:
                # We can extract the raw file if needed, but let's just note we found it
                pass

        if step > 162 and data.get('source') == 'MODEL' and data.get('type') == 'PLANNER_RESPONSE':
            tool_calls = data.get('tool_calls', [])
            for tc in tool_calls:
                name = tc.get('name', '')
                if name.startswith('default_api:'):
                    name = name.split(':')[1]
                
                raw_args = tc.get('args', tc.get('arguments', {}))
                args = {}
                
                if isinstance(raw_args, str):
                    try:
                        args = json.loads(raw_args)
                    except:
                        pass
                else:
                    # Values might be JSON strings
                    for k, v in raw_args.items():
                        if isinstance(v, str) and (v.startswith('"') or v.startswith('[')):
                            try:
                                args[k] = json.loads(v)
                            except:
                                args[k] = v
                        else:
                            args[k] = v
                
                if name == 'replace_file_content':
                    changes.append({
                        'tool': name,
                        'file': args.get('TargetFile'),
                        'target': args.get('TargetContent'),
                        'replacement': args.get('ReplacementContent')
                    })
                elif name == 'multi_replace_file_content':
                    chunks = args.get('ReplacementChunks', [])
                    for chunk in chunks:
                        changes.append({
                            'tool': 'replace_file_content',
                            'file': args.get('TargetFile'),
                            'target': chunk.get('TargetContent'),
                            'replacement': chunk.get('ReplacementContent')
                        })
    except Exception as e:
        pass

# Reverse the order of changes to undo them sequentially
changes.reverse()

success_count = 0
fail_count = 0

reverted_files = set()

for c in changes:
    file_path = c.get('file')
    target = c.get('target')
    replacement = c.get('replacement')
    
    if not file_path or not file_path.endswith('.tsx'):
        continue
        
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
            
        if replacement in content:
            new_content = content.replace(replacement, target)
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Successfully reverted a change in {os.path.basename(file_path)}")
            reverted_files.add(os.path.basename(file_path))
            success_count += 1
        else:
            print(f"Failed to find replacement string in {os.path.basename(file_path)}")
            fail_count += 1
    except Exception as e:
        print(f"Error accessing {file_path}: {e}")

print(f"\nDone. Success: {success_count}, Fail: {fail_count}")
print(f"Reverted files: {', '.join(reverted_files)}")
