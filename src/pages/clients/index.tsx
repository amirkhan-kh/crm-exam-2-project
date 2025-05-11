import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LuHardDriveUpload } from "react-icons/lu";

import type { UploadProps } from 'antd';
import { Button, Upload } from 'antd';
import type { AppDispatch, RootState } from '../../store/store-config'
import { fetchClients } from '../../store/clients-slice';
import {  Image,  Input,  Spin, Table } from 'antd';
import type { DataType } from '../../type/index';
import { columnsClients } from '../../db';
import AddClient from '../../components/ui/modal-btns/add-client';


const props: UploadProps = {
  action: '//jsonplaceholder.typicode.com/posts/',
  listType: 'picture',
  previewFile(file) {
    console.log('Your upload file:', file);
    return fetch('https://next.json-generator.com/api/json/get/4ytyBoLK8', {
      method: 'POST',
      body: file,
    })
      .then((res) => res.json())
      .then(({ thumbnail }) => thumbnail);
  },
};
const Clients: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { clients, loading, error} = useSelector((state: RootState)=> state.clients);
  console.log(clients);

  useEffect(() => {
    dispatch(fetchClients());
  }, [dispatch]);
  

  const tableDataClients: DataType[] = clients.map((cli) => ({
    key: cli.id,
    name:  <div className='text-indigo-400 text-[12px] font-semibold flex items-center gap-2'>
    {cli?.avatar ? (
      <Image src={cli.avatar} alt="Avatar" width={32} height={32} style={{borderRadius: "100px"}} />
    ) : (
      <span className='w-[32px] h-[32px] grid place-content-center bg-[#ede9e9] rounded-[100px]'>
        {cli.name.charAt(0).toUpperCase()}
      </span>
    )}
    {cli?.name.charAt(0).toUpperCase() + cli.name.slice(1).toLocaleLowerCase()}
  </div>,
  
    role: <p className='text-[12px] font-semibold'>{(cli.phone)}</p>,
    phone: <p className='text-[12px] font-semibold'>{(cli.branch_name)}</p>,
    branch: <p className='text-[12px] font-semibold'>{(cli.branch_name)}</p>,
    shift: (
      <div className="text-[12px] font-semibold flex gap-1 w-[100px] h-[30px]">
        {/* <span>{cli.license_file}</span> */}
        <Upload {...props}>
          <Button size="small" variant='solid' icon={<LuHardDriveUpload />}>
            Upload
          </Button>
        </Upload>
      </div>
    ),
    birth_date:  <p className='text-[12px] font-semibold'>
    {cli.created_at.slice(0, 10)} - {cli.created_at.slice(11, 19)}
  </p>,
  }))
  
  if(loading) return <div className="flex justify-center items-center h-64">
  <Spin size="large" />
</div>
  if(loading) return <div className="text-red-500 font-semibold">Xatolik: {error}</div>;
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
      <Input placeholder="Qidiruv" style={{width: "320px"}}/>
      <AddClient>
        + Mijoz qo'shish
      </AddClient>
      </div>
      <Table<DataType>
          columns={columnsClients}
          dataSource={tableDataClients}
          pagination={{
            pageSize: 6,
            showSizeChanger: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} / ${total} ta xodim`,
            onChange: (page, pageSize) => {
              console.log("Sahifa o'zgardi:", page, "Hajmi:", pageSize);
            
            },
          }}
        />
    </div>
  )
}

export default Clients
