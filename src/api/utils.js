import {CONFIG }from '../config/config';
import axiosInstance from './axiosInstance';

export default {
  async saveAsFile(data, filename, filetype) {
    let blob = new Blob([data], { type: filetype });
    let url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },
  async convertToCSV(objArray) {
    var array = typeof objArray != "object" ? JSON.parse(objArray) : objArray;
    var str = "";

    for (var i = 0; i < array.length; i++) {
      var line = "";
      for (var index in array[i]) {
        if (line != "") line += ",";
        line += array[i][index];
      }
      str += line + "\r\n";
    }

    return str;
  },
  async downloadFileURL(name,asset,url) {
    const fullUrl = `${url}api/info/download?challenge=${name}&asset=${asset}`;
    
    try {
      const response = await axiosInstance({
        method: 'get',
        url: fullUrl,
        responseType: 'blob'
      });

      const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
      return downloadUrl;
    } catch (error) {
      console.error('There has been a problem with your axios operation:', error);
    }
  }
};

