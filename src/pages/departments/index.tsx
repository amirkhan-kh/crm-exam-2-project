import React from 'react';
import { Input, Select, Table, Empty } from 'antd';
import type { DataType } from '../../type/index';
import { columnsEmploye } from '../../db';

export const Salary: React.FC = () => {

  
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Input placeholder="Qidiruv" />
          <Select
            style={{ width: 200 }}
            options={[
              { value: "1", label: "Uchtepa filiali" },
              { value: "2", label: "Chilonzor filiali" },
              { value: "3", label: "Yashnabod filiali" },
            ]}
          />
        </div>
      </div>
      <div>
        <Table<DataType>
          columns={columnsEmploye}
          locale={{
            emptyText: <Empty description="Ma'lumot mavjud emas" />
          }}
        />
      </div>
    </div>
  );
};

export default Salary;
