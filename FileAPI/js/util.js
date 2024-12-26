function delay(duration = 1000) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
}

function clearContent() {
  contentContainer.innerHTML = "";
}

function setContent(htmlStr) {
  contentContainer.innerHTML = htmlStr;
}

/**
 * 权限检查
 **/
async function verifyPermission(handle, withWrite) {
  const opts = {};
  if (withWrite) {
    opts.mode = "readwrite";
  }

  // Check if we already have permission, if so, return true.
  if ((await handle.queryPermission(opts)) === "granted") {
    return true;
  }

  // Request permission to the file, if the user grants permission, return true.
  if ((await handle.requestPermission(opts)) === "granted") {
    return true;
  }

  // The user did not grant permission, return false.
  return false;
}

async function listFiles(dirHandle) {
  const fileEntries = await getAllFiles(dirHandle);
  const paths = fileEntries.map((e) => e.path).sort();
  const htmlStr = paths.map((p) => `<div>${p}</div>`).join("");
  setContent(htmlStr)
}

async function getAllFiles(dirHandle, currentPath = dirHandle.name) {
  try {
    // 准备一个数组用于存储文件路径
    let entries = [];

    // 定义一个递归函数用于遍历目录，并构建文件路径
    async function traverseDirectory(directoryHandle, path) {
      for await (const entry of directoryHandle.values()) {
        const entryPath = path ? `${path}/${entry.name}` : entry.name;

        if (entry.kind === "file") {
          // 如果是文件，则添加到文件路径数组
          entry.path = entryPath;
          entries.push(entry);
        } else if (entry.kind === "directory") {
          // 如果是目录，则递归调用自身继续遍历
          await traverseDirectory(entry, entryPath);
        }
      }
    }

    // 开始遍历所选目录，并构建文件路径
    await traverseDirectory(dirHandle, currentPath);

    return entries;
  } catch (error) {
    console.error("Error:", error);
  }
}

async function writeFileContent(fileHandle, contents) {
  const writable = await fileHandle.createWritable({
    keepExistingData: true,
    mode: "exclusive",
  });

  // 将文件内容写入到流中。
  await writable.write(contents);

  // 关闭文件并将内容写入磁盘。
  await writable.close();
}

function readFileAsText(file, encoding = "utf-8") {
  return new Promise((resolve, reject) => {
    const fd = new FileReader();

    fd.onload = function () {
      resolve(fd.result);
    };

    fd.onerror = reject;

    fd.readAsText(file, encoding);
  });
}
