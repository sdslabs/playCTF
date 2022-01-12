export default {
  async saveAsFile(res, filename, filetype) {
    let blob = new Blob([res.data], { type: filetype });
    let url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};
