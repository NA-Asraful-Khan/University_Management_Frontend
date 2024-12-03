import { Descriptions } from "antd";

const UserInfoDetails = ({ userData }: any) => {
  return (
    <div>
      {userData?.map((user: any, index: number) => {
        return (
          <div key={index} className="mb-2">
            <Descriptions
              size="middle"
              title={user?.title}
              items={user?.data}
            />
          </div>
        );
      })}
    </div>
  );
};

export default UserInfoDetails;
