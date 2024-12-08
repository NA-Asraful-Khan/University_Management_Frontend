import { Avatar, List } from "antd";

const Credentials = () => {
  const data = [
    {
      title: "Admin",
      Description: "ID: A-0001, Password: adminpass",
    },
    {
      title: "Faculty",
      Description: "ID: F-0001, Password: facultypass",
    },
    {
      title: "Student",
      Description: "ID: 2024020001, Password: studentpass",
    },
  ];
  return (
    <List
      itemLayout="horizontal"
      dataSource={data}
      renderItem={(item, index) => (
        <List.Item>
          <List.Item.Meta
            avatar={
              <Avatar
                src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}
              />
            }
            title={item.title}
            description={item.Description}
          />
        </List.Item>
      )}
    />
  );
};

export default Credentials;
