## 上传下载
```js
const openDownloadDialog = (url, fileName) => {
  if (typeof url === 'object' && url instanceof Blob) {
    url = URL.createObjectURL(url); // 创建blob地址
  }
  const aLink = document.createElement('a');
  aLink.href = url;
  aLink.download = fileName;
  aLink.click();
};
export default {
  /**
   * 保存CSV文件
   * @params content csv文件内容
   * @params fileName 保存的文件名
   */
  saveTXT: (content, fileName) => {
    const blob = new Blob(['\ufeff' + content], {
      type: 'text/tet,charset=UTF-8'
    });
    openDownloadDialog(blob, `${fileName}.txt`);
  }
};
```

```js
import axios from 'axios';
import cookie from './cookie';

function _download(content, fileName) {
  const blob = new Blob([content]);
  const url = window.URL.createObjectURL(blob);
  const aLink = document.createElement('a');
  aLink.style.display = 'none';
  aLink.href = url;
  aLink.setAttribute('download', fileName);
  document.body.appendChild(aLink);
  aLink.click();
}

export default function download(url, fileName, options) {
  const defaultOptions = {
    credentials: 'include'
  };
  const newOptions = {
    ...defaultOptions,
    ...options
  };
  const headers = newOptions.headers || {};

  newOptions.headers = {
    ...headers
  };
  newOptions.url = url;
  const token = cookie.get('token');
  if (token) {
    newOptions.headers.Authorization = `GRJWT ${token}`;
  }
  newOptions.responseType = 'blob';
  newOptions.method = 'get';
  axios(newOptions).then(res => {
    const reader = new FileReader();
    const { data } = res;
    reader.onload = () => {
      // if (!fileName) {
      //   const contentDisposition = res.headers['content-disposition'];
      //   if (contentDisposition) {
      //     fileName = window.decodeURI(
      //       res.headers['content-disposition'].split('=')[2].split("''")[1],
      //       'UTF-8'
      //     );
      //   }
      // }
      _download(data, fileName);
    };
    reader.readAsText(data);
  });
}
```