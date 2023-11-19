import { useState } from 'react';
import { Input, Button, Space, Typography, Select } from 'antd';
// eslint-disable-next-line import/no-extraneous-dependencies
import { CloseOutlined } from '@ant-design/icons';

type FilterFieldType = 'text' | 'number' | 'select' | 'tag';

export interface IBaseFilters {
  pageNumber?: number;
  pageSize?: number;
}

export type FilterField<F> = {
  name: keyof F;
  label: string;
  type: FilterFieldType;
  options?: { value: string; label?: string }[];
  placeholder?: string;
  defaultValue?: string;
  infoText?: string;
};

interface FilterProps<F> {
  onFilterChange: (filters: F) => void;
  filterFields: FilterField<F>[];
}

export const Filter = <F extends { [key: string]: any }>({ onFilterChange, filterFields }: FilterProps<F>) => {
  const [filters, setFilters] = useState<F>({} as F);

  const handleFilterChange = (name: keyof F, value: any) => {
    setFilters(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const removeFromFilter = (name: keyof F) => {
    setFilters(prev => ({
      ...prev,
      [name]: '',
    }));
  };

  const handleFilterApply = () => {
    onFilterChange(filters);
  };

  return (
    <Space wrap className="w-full" align="end">
      {filterFields?.map(fI => {
        const { name, label, type, options, defaultValue, placeholder } = fI;
        return (
          <Space key={name as string} direction="vertical" className="w-full">
            <Typography>{label}</Typography>
            {type === 'select' && (
              <Select
                options={options || []}
                disabled={!!defaultValue}
                value={defaultValue || filters?.[name] || ''}
                onChange={value => handleFilterChange(name, value)}
                className="w-[120px] md:w-[250px]"
              />
            )}
            {type === 'tag' && (
              <Select
                mode="tags"
                placeholder={placeholder}
                value={filters?.[name]}
                onChange={value => handleFilterChange(name, value)}
                options={options}
                className="w-[200px] md:w-[250px]"
              />
            )}
            {(type === 'text' || type === 'number') && (
              <Input
                type={type}
                placeholder={placeholder}
                value={filters?.[name]}
                onChange={e => handleFilterChange(name, e.target.value)}
                addonAfter={<CloseOutlined key={name as string} onClick={() => removeFromFilter(name)} />}
              />
            )}
          </Space>
        );
      })}
      <Button type="primary" onClick={handleFilterApply}>
        Apply Filters
      </Button>
    </Space>
  );
};
