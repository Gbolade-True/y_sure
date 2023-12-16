/* eslint-disable import/no-extraneous-dependencies */
import { AutoComplete, Button, Divider, Form, Input, Switch, Typography } from 'antd';
import { PlusOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { mockNylons } from '@/mocks/nylon';
import { MakePurchaseDto, UpdatePurchaseDto } from '@/pages/api/_server/dtos/purchase';

const { TextArea } = Input;

interface PurchaseFormProps {
  purchaseToEdit?: UpdatePurchaseDto;
}

const SaleForm = ({ purchaseToEdit }: PurchaseFormProps) => {
  const nylons = purchaseToEdit?.totalCost ? purchaseToEdit?.nylons : mockNylons;
  const [form] = Form.useForm<MakePurchaseDto>();
  const [isNewNylonMap, setIsNewNylonMap] = useState<{ [key: string]: any }>({});
  const [filteredNylons, setFilteredNylons] = useState(nylons);

  const onFinish = (values: any) => {
    // eslint-disable-next-line no-console
    console.log('Form Values:', values);
  };

  useEffect(() => {
    if (!purchaseToEdit) {
      form.resetFields();
      return;
    }
    form.setFieldsValue(purchaseToEdit);
  }, [purchaseToEdit, form]);

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
    <Form form={form} layout="vertical" onFinish={onFinish} initialValues={purchaseToEdit || {}}>
      <Form.Item<UpdatePurchaseDto>
        label="Amount"
        name="totalCost"
        rules={[{ required: true, message: 'This field is required' }]}
      >
        <Input type="number" prefix="₦" className="w-full h-10" />
      </Form.Item>

      <Divider />
      <Form.Item<UpdatePurchaseDto>
        name="nylons"
        label="Nylons Bought"
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
                  <Form.Item {...restField} name={[name, 'isNewNylon']} valuePropName="checked" initialValue={false}>
                    <Typography className="text-xs">Only click this if the nylon is not in the list above</Typography>
                    <Switch
                      checkedChildren="New"
                      unCheckedChildren="Existing"
                      checked={!!isNewNylonMap[key]}
                      onChange={checked => setIsNewNylonMap(prevMap => ({ ...prevMap, [key]: checked }))}
                    />
                  </Form.Item>
                  {isNewNylonMap[key] ? (
                    <Form.Item
                      {...restField}
                      name={[name, 'price']}
                      label="Price"
                      rules={[{ required: true, message: 'This field is required' }]}
                    >
                      <Input type="number" prefix="₦" className="w-full h-10" />
                    </Form.Item>
                  ) : null}
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

      <Form.Item<UpdatePurchaseDto> label="Comment" name="comment">
        <TextArea className="h-10" rows={4} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          {purchaseToEdit ? 'Edit' : 'Create'}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SaleForm;
