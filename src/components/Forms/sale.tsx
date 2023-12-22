// eslint-disable-next-line import/no-extraneous-dependencies
import { PlusOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { ISale } from '@/pages/api/_server/interfaces/sale';
import { AutoComplete, Button, Divider, Form, Input, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { mockNylons } from '@/mocks/nylon';

const { TextArea } = Input;
interface SaleFormProps {
  saleToEdit?: ISale;
}

const SaleForm = ({ saleToEdit }: SaleFormProps) => {
  const nylons = saleToEdit?.totalAmount ? saleToEdit?.nylons : mockNylons;
  const [form] = Form.useForm<ISale>();
  const [filteredNylons, setFilteredNylons] = useState(nylons);

  const onFinish = (values: any) => {
    // eslint-disable-next-line no-console
    console.log('Form Values:', values);
  };

  useEffect(() => {
    if (!saleToEdit) {
      form.resetFields();
      return;
    }
    form.setFieldsValue(saleToEdit);
  }, [saleToEdit, form]);

  const handleAddField = () => {
    const currentFields = form.getFieldValue('nylons') || [];
    const newFields = [...currentFields, ''];
    form.setFieldsValue({ nylons: newFields });
  };

  const handleRemoveField = (index: number) => {
    const currentFields = form.getFieldValue('nylons') || [];
    const newFields = [...currentFields.slice(0, index), ...currentFields.slice(index + 1)];
    form.setFieldsValue({ nylons: newFields });
  };

  const disableAddMoreFields = () => {
    const currentFields = form.getFieldValue('nylons') || [];
    if (currentFields.length) {
      return !currentFields?.[currentFields.length - 1]?.name || !currentFields?.[currentFields.length - 1]?.quantity;
    }
    return false;
  };

  const handleSearch = (value: string) => {
    if (!value) setFilteredNylons(nylons);
    const filtered = nylons.filter(n => n.name.toLowerCase().includes(value.toLowerCase()));
    setFilteredNylons(filtered);
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish} initialValues={saleToEdit || {}}>
      <Form.Item<ISale>
        label="Amount Paid"
        name="amountPaid"
        rules={[{ required: true, message: 'This field is required' }]}
      >
        <Input type="number" prefix="₦" className="w-full h-10" />
      </Form.Item>

      <Divider />
      <Form.Item<ISale>
        name="nylons"
        label="Nylons Sold"
        rules={[{ required: true, message: 'At least one nylon must be in a sale' }]}
      >
        <Form.List name="nylons">
          {fields => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <div key={key} className="mb-2 border border-solid border-gray-400 p-4 rounded-md relative">
                  <Typography>{key + 1}</Typography>
                  <CloseCircleOutlined
                    className="absolute right-2 top-2 text-xl text-red-600 cursor-pointer"
                    onClick={() => handleRemoveField(key)}
                  />
                  <Form.Item
                    {...restField}
                    name={[name, 'name']}
                    rules={[{ required: true, message: 'Select a nylon' }]}
                    label="Nylon"
                  >
                    <AutoComplete
                      placeholder="Select a nylon"
                      className="h-10 w-full"
                      options={filteredNylons.map(f => ({ value: f.name }))}
                      onSearch={handleSearch}
                    />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, 'quantity']}
                    rules={[{ required: true, message: 'Must be a number' }]}
                    label="Quantity"
                  >
                    <Input type="number" className="w-full h-10" />
                  </Form.Item>
                </div>
              ))}
              <Form.Item>
                <Button
                  icon={<PlusOutlined />}
                  type="text"
                  onClick={() => handleAddField()}
                  key={fields?.[fields.length - 1]?.name}
                  disabled={disableAddMoreFields()}
                >
                  Add Nylon
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form.Item>
      <Divider />

      <Form.Item<ISale> label="Customer" name="customerName">
        <Input className="h-10" />
      </Form.Item>

      <Form.Item<ISale> label="Comment" name="comment">
        <TextArea className="h-10" rows={4} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          {saleToEdit ? 'Edit' : 'Register'}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SaleForm;
