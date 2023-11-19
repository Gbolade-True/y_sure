import { NylonTypeEnum } from '@/pages/api/_server/enums/NylonTypeEnum';
import { INylon } from '@/pages/api/_server/interfaces/nylon';
import { Button, Form, Input, Radio, Select } from 'antd';
import { useEffect } from 'react';

interface NylonFormProps {
  nylonToEdit?: INylon;
}

const NylonForm = ({ nylonToEdit }: NylonFormProps) => {
  const [form] = Form.useForm<INylon>();

  const onFinish = (values: any) => {
    // eslint-disable-next-line no-console
    console.log('Form Values:', values);
  };

  useEffect(() => {
    if (!nylonToEdit) {
      form.resetFields();
      return;
    }
    form.setFieldsValue(nylonToEdit);
  }, [nylonToEdit, form]);

  return (
    <Form form={form} layout="vertical" onFinish={onFinish} initialValues={nylonToEdit || {}}>
      <Form.Item<INylon> label="Name" name="name" rules={[{ required: true, message: 'This field is required' }]}>
        <Input className="h-10" />
      </Form.Item>

      <Form.Item<INylon> label="Color" name="color" rules={[{ required: true, message: 'This field is required' }]}>
        <Select className="h-10">
          <Select.Option value="black">Black</Select.Option>
          <Select.Option value="white">White</Select.Option>
          <Select.Option value="grey">Grey</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item<INylon> label="Price" name="price" rules={[{ required: true, message: 'This field is required' }]}>
        <Input type="number" prefix="₦" className="w-full h-10" />
      </Form.Item>

      <Form.Item<INylon>
        label="Quantity"
        name="quantity"
        rules={[{ required: true, message: 'This field is required' }]}
      >
        <Input type="number" step={10} className="w-full h-10" />
      </Form.Item>

      <Form.Item<INylon> label="Height" name="height">
        <Input type="number" className="w-full h-10" />
      </Form.Item>

      <Form.Item<INylon> label="Width" name="width">
        <Input type="number" className="w-full h-10" />
      </Form.Item>

      <Form.Item<INylon> label="Type" name="type">
        <Radio.Group>
          <Radio value={NylonTypeEnum.SMALL}>{NylonTypeEnum.SMALL}</Radio>
          <Radio value={NylonTypeEnum.MEDIUM}>{NylonTypeEnum.MEDIUM}</Radio>
          <Radio value={NylonTypeEnum.LARGE}>{NylonTypeEnum.LARGE}</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item<INylon> label="Manufacturer" name="manufacturer">
        <Input className="h-10" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          {nylonToEdit?.name ? 'Edit' : 'Create'}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default NylonForm;
