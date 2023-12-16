import { useEffect } from 'react';
import { CreateNylonDto, UpdateNylonDto } from '@/pages/api/_server/dtos/nylon';
import { NylonTypeEnum } from '@/pages/api/_server/enums/NylonTypeEnum';
import { Button, Form, Input, Radio } from 'antd';

interface NylonFormProps {
  nylonToEdit?: UpdateNylonDto;
}

const NylonForm = ({ nylonToEdit }: NylonFormProps) => {
  const [form] = Form.useForm<CreateNylonDto>();

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
      <Form.Item<CreateNylonDto>
        label="Name"
        name="name"
        rules={[{ required: true, message: 'This field is required' }]}
      >
        <Input className="h-10" />
      </Form.Item>

      <Form.Item<CreateNylonDto>
        label="Price"
        name="price"
        rules={[{ required: true, message: 'This field is required' }]}
      >
        <Input type="number" prefix="₦" className="w-full h-10" />
      </Form.Item>

      <Form.Item<CreateNylonDto>
        label="Quantity"
        name="quantity"
        rules={[{ required: true, message: 'This field is required' }]}
      >
        <Input type="number" step={10} className="w-full h-10" />
      </Form.Item>

      <Form.Item<CreateNylonDto> label="Type" name="type">
        <Radio.Group>
          <Radio value={NylonTypeEnum.STANDARD}>{NylonTypeEnum.STANDARD}</Radio>
          <Radio value={NylonTypeEnum.SOUVENIR}>{NylonTypeEnum.SOUVENIR}</Radio>
          <Radio value={NylonTypeEnum.ZIPLOCK}>{NylonTypeEnum.ZIPLOCK}</Radio>
          <Radio value={NylonTypeEnum.GHANA_MUST_GO}>{NylonTypeEnum.GHANA_MUST_GO}</Radio>
          <Radio value={NylonTypeEnum.INDUSTRIAL}>{NylonTypeEnum.INDUSTRIAL}</Radio>
          <Radio value={NylonTypeEnum.PARTY}>{NylonTypeEnum.PARTY}</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item<CreateNylonDto> label="Manufacturer" name="manufacturer">
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
