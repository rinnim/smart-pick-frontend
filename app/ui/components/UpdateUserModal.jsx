import FormInputField from "./FormInputField2";
import Modal from "./Modal";

const UpdateUserModal = ({
  isOpen,
  onClose,
  onConfirm,
  updateUserData,
  setUpdateUserData,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Update User"
      onConfirm={onConfirm}
      confirmText="Update"
    >
      <div className="flex flex-col gap-4">
        <FormInputField
          label="First Name"
          placeholder={updateUserData?.firstName}
          value={updateUserData?.firstName}
          onChange={(e) =>
            setUpdateUserData({
              ...updateUserData,
              firstName: e.target.value,
            })
          }
        />
        <FormInputField
          label="Last Name"
          placeholder={updateUserData?.lastName}
          value={updateUserData?.lastName}
          onChange={(e) =>
            setUpdateUserData({
              ...updateUserData,
              lastName: e.target.value,
            })
          }
        />
        <FormInputField
          label="Username"
          placeholder={updateUserData?.username}
          value={updateUserData?.username}
          onChange={(e) =>
            setUpdateUserData({
              ...updateUserData,
              username: e.target.value,
            })
          }
        />
        <FormInputField
          label="Email"
          placeholder={updateUserData?.email}
          value={updateUserData?.email}
          onChange={(e) =>
            setUpdateUserData({
              ...updateUserData,
              email: e.target.value,
            })
          }
        />
      </div>
    </Modal>
  );
};

export default UpdateUserModal;
