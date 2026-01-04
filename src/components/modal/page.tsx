const ModalDialog = (props: any) => {
  const { show, closeCallback, user, approveDelete } = props;

  if (show) {
    return (
      <div
        className="bg-black/90 fixed w-screen h-screen top-0"
        onClick={closeCallback}
      >
        <div className="bg-white rounded w-125 mx-auto mt-[20%] p-4 relative">
          <div
            className="font-bold cursor-pointer absolute right-3 top-3"
            onClick={closeCallback}
          >
            X
          </div>
          <div>
            {" "}
            Anda akan menghapus data{" "}
            <span className="text-red-800 italic">{user.name}</span>?
          </div>
          <div className="flex mt-5">
            <button
              onClick={closeCallback}
              className="grow rounded px-3 py-1 mr-4 text-white bg-green-700 cursor-pointer hover:opacity-80"
            >
              Batal
            </button>
            <button
              onClick={approveDelete}
              className="grow rounded px-3 py-1 mr-4 text-white bg-red-700 cursor-pointer hover:opacity-80"
            >
              Hapus
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export default ModalDialog;
