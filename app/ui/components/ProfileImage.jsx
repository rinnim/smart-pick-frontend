import Image from "next/image";
import { twMerge } from "tailwind-merge";
const ProfileImage = ({
  src,
  alt = "profile image",
  width = 100,
  height = 100,
  className,
}) => {
  const newClassName = twMerge(
    "h-40 w-40 rounded-full border border-gray-700 object-cover p-1",
    className,
  );
  return (
    <Image
      alt={alt}
      src={src}
      width={width}
      height={height}
      className={newClassName}
    />
  );
};

export default ProfileImage;
