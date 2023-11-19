import { ISale } from '@/pages/api/_server/interfaces/sale';
import { Button, Divider, Form, Input, Select, Space } from 'antd';
// eslint-disable-next-line import/no-extraneous-dependencies
import { PlusOutlined } from '@ant-design/icons';
import { useEffect } from 'react';
import { mockNylons } from '@/mocks/nylon';

const { TextArea } = Input;

interface SaleFormProps {
  saleToEdit?: ISale;
}

const SaleForm = ({ saleToEdit }: SaleFormProps) => {
  const [form] = Form.useForm<ISale>();

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
                <Space key={key} style={{ marginBottom: 8 }} align="baseline">
                  <Space key={key} style={{ marginBottom: 8 }} align="center">
                    <Form.Item
                      {...restField}
                      name={[name, 'name']}
                      rules={[{ required: true, message: 'Select a field' }]}
                    >
                      <Select placeholder="Select a field" className="h-10">
                        {(saleToEdit?.amountPaid ? saleToEdit?.nylons : mockNylons)?.map(n => (
                          <Select.Option key={n.id} value={n.name}>
                            {n.name}
                          </Select.Option>
                        ))}
                        {/* Add more options as needed */}
                      </Select>
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, 'quantity']}
                      rules={[{ required: true, message: 'Must be a number' }]}
                    >
                      <Input type="number" className="w-full h-10" />
                    </Form.Item>
                  </Space>
                  <Button type="link" onClick={() => handleRemoveField(key)}>
                    Remove
                  </Button>
                </Space>
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
          {saleToEdit ? 'Edit' : 'Create'}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SaleForm;
