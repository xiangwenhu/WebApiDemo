function getTextBlob(content) {
    return new Blob([content], {
      type: "text/plain",
    });
  }



  self.onmessage = async function(ev){
    const data = ev.data;
    const blob = getTextBlob(data.data);

    const bytes = await blob.bytes();

    self.postMessage({
        type: "bytes",
        data: {
            byteLength: bytes.byteLength
        }
    })

  }