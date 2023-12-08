type UserItemProps = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  gender?: string;
  bodyweight?: number | string;
  workoutProgramId: number;
};

const UserItem: React.FC<UserItemProps> = ({
  id,
  firstName,
  lastName,
  email,
  gender,
  bodyweight,
  workoutProgramId,
}) => {
  return (
    <>
      <tr>
        <td>{firstName}</td>
        <td>{lastName}</td>
        <td>{email}</td>
        <td>{gender}</td>
        <td>{bodyweight}</td>
        <td>{workoutProgramId}</td>
      </tr>
    </>
  );
};

export default UserItem;
