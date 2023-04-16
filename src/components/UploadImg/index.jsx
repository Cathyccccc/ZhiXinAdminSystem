import React, {useState, useEffect} from 'react';
import { message, Modal, Upload } from 'antd';
import $http from 'api';
import * as qiniu from 'qiniu-js';

// console.log(qiniu)

export default function UploadImg({avatar=null, getNewAvatar}) {
  const [fileList, setFileList] = useState([]);
  const [previewImg, setPreviewImg] = useState(null);
  const [token, setToken] = useState('');
  const [url, setUrl] = useState('');
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (avatar) { // 这里会影响后面delete
      setFileList([{url: avatar}]);
      setPreviewImg(avatar)
    }
    getUrl();
    getToken();
  }, []) 
  const getUrl = async () => {
    const res = await qiniu.getUploadUrl({
      useCdnDomain: false,
      region: qiniu.region.z1
    })
    setUrl(res);
  }
  const getToken = async () => {
    const {data} = await $http.getUploadToken({
      bucket: 'zhixin-oa',
      uploadUrl: 'rmix8dgt9.hb-bkt.clouddn.com',
      accessKey: 'B3s_oeYskW_KSY5yt2f5ez0D-P2yJGyj243OqETX',
      secretKey: 'Nq5-1KPda0eTIwJKsnurQ9C7Lzmex2w6x0E1OdcH'
    })
    setToken(data);
  }

  const handlePreview = () => {
    setVisible(true);
  };
  const handleChange = async ({file, fileList}) => {
    setFileList(fileList);
    if (file.status === 'done') {
      setPreviewImg('//' + file.response.url)
      getNewAvatar('//' + file.response.url)
      if (previewImg || avatar) { // 不是首次上传时，删除原来的图片
        deletePreImg();
      }
    }
  };
  // 删除原先的照片
  const deletePreImg = async () => {
    const {msg, code} = await $http.deleteFile({
      bucket: 'zhixin-oa',
      fileName: previewImg || avatar,
      // accessKey: 'B3s_oeYskW_KSY5yt2f5ez0D-P2yJGyj243OqETX',
      // secretKey: 'Nq5-1KPda0eTIwJKsnurQ9C7Lzmex2w6x0E1OdcH'
    })
    if (!code) {
      message.success(msg)
    }
  };
  return (
    <>
      <Upload
        action={url}
        data={{
          token
        }}
        listType="picture-card"
        fileList={fileList}
        maxCount={1}
        onPreview={handlePreview}
        onChange={handleChange}
        onRemove={deletePreImg}
      >
        {fileList.length < 2 && '+ Upload'}
      </Upload>
      <Modal footer={null} open={visible} onCancel={() => setVisible(false)}>
        <img
          style={{
            width: '100%',
          }}
          src={previewImg}
        />
      </Modal>
    </>
  )
}
