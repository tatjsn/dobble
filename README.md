# How to generate symbols.js

Firstly, prepare 57 square-ish PNG images in ./images directory. Then executes:

```sh
cd images
md5 * | sed -e 's/MD5 (\(.*\)) = \(.*\)$/mv -v "\1" \2\.png/' | sh
echo export let all=$(python -c 'import os, json; print json.dumps(os.listdir("."))') > ../symbols.js
```

# How to run locally

```sh
python -m SimpleHTTPServer
```
