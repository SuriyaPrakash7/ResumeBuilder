import React, { useState } from "react";
import { PuffLoader } from "react-spinners";
import { FaTrash, FaUpload } from "react-icons/fa";
import { toast } from "react-toastify";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { storage } from "../config/firebase.config"; // Ensure this path is correct
import { initialTags } from "../utils/helpers";
import { serverTimestamp } from "firebase/firestore";
import { useTemplates } from "../api";

const CreateTemplate = () => {
  const [formData, setFormData] = useState({
    title: "",
    imageURL: null,
  });

  const [imageAsset, setImageAsset] = useState({
    isImageLoading: false,
    uri: null,
    progress: 0,
  });

  const [selectedTags, setSelectedTags] = useState([]);
  const {data:templates , isError:templatesISErros, isLoading :templatesisLoading, refetch:templatesrefetch} =useTemplates()

  // Handling the input field change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevRec) => ({ ...prevRec, [name]: value }));
  };

  // Check if file type is allowed
  const isAllowed = (file) => {
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    return allowedTypes.includes(file.type);
  };

  // Handle the image file changes
  const handleFileSelect = async (e) => {
    setImageAsset((prevAsset) => ({ ...prevAsset, isImageLoading: true }));
    const file = e.target.files[0];

    if (file && isAllowed(file)) {
      const storageRef = ref(storage, `Templates/${Date.now()}-${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageAsset((prevAsset) => ({ ...prevAsset, progress }));
        },
        (error) => {
          toast.error("Upload failed. Please try again.");
          setImageAsset((prevAsset) => ({
            ...prevAsset,
            isImageLoading: false,
          }));
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          setImageAsset({
            isImageLoading: false,
            uri: downloadURL,
            progress: 100,
          });
          setFormData((prevData) => ({ ...prevData, imageURL: downloadURL }));
          toast.success("Image uploaded successfully!");
        }
      );
    } else {
      toast.info("Invalid File Format");
      setImageAsset((prevAsset) => ({ ...prevAsset, isImageLoading: false }));
    }
  };

  const deleteAnImageObject = async () => {
    setImageAsset((prevAsset) => ({ ...prevAsset, isImageLoading: true }));
    const deleteRef = ref(storage, imageAsset.uri);
    deleteObject(deleteRef)
      .then(() => {
        toast.success("Image deleted");
        setTimeout(() => {
          setImageAsset((prevAsset) => ({
            ...prevAsset,
            progress: 0,
            uri: null,
            isImageLoading: false,
          }));
        }, 2000);
      })
      .catch((error) => {
        toast.error("Failed to delete image");
        console.error("Error deleting image:", error);
      });
  };
  const handleSelectedTags = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((selected) => selected !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };
  const pushToCloud= async() =>{
    const timestamp=serverTimestamp()
    const id='${Data.now()}'
    const _doc={
      _id:id,
      title:formData.title,
      imageURL:imageAsset.uri,
      tags:selectedTags,
      name:'Template 1',
      timestamp:timestamp,
    }
  };
  return (
    <div className="w-full px-4 lg:px-10 2xl:px-32 py-4 grid grid-cols-1 lg:grid-cols-12">
      <div className="col-span-12 lg:col-span-4 2xl:col-span-3 w-full flex-1 flex items-center justify-start flex-col gap-4 px-2">
        <div className="w-full mb-4">
          <p className="text-2xl text-txtPrimary justify-center">
            Create your template
          </p>
        </div>
        <div className="w-full flex items-center justify-end mb-2">
          <p className="text-base text-txtLight uppercase font-semibold">
            TempID:
          </p>
          <p className="text-sm text-txtDark capitalize font-bold ml-2">
            Template1
          </p>
        </div>
        <input
          className="w-full px-4 py-3 rounded-md bg-transparent border border-gray-300 text-lg text-txtPrimary focus:text-txtDark focus:shadow-md outline-none mb-4"
          type="text"
          name="title"
          placeholder="Template Title"
          value={formData.title}
          onChange={handleInputChange}
        />
        {/* file uploader section */}
        <div className="w-full bg-gray-100 backdrop-blur-md h-[400px] lg:h-[600px] 2xl:h-[720px] rounded-md border-2 border-dotted border-gray-300 cursor-pointer flex items-center justify-center mb-4">
          {imageAsset.isImageLoading ? (
            <React.Fragment>
              <div className="flex flex-col items-center justify-center gap-4">
                <PuffLoader color="#498FCD" size={40} />
                <p>{imageAsset.progress.toFixed(2)}%</p>
              </div>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {!imageAsset.uri ? (
                <label className="w-full cursor-pointer h-full">
                  <div className="flex flex-col items-center justify-center h-full w-full">
                    <div className="flex items-center justify-center cursor-pointer flex-col gap-4">
                      <FaUpload className="text-2xl" />
                      <p className="text-lg text-txtLight">Click to upload</p>
                    </div>
                  </div>
                  <input
                    type="file"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </label>
              ) : (
                <React.Fragment>
                  <div className="relative w-full h-full overflow-hidden rounded-md">
                    <img
                      src={imageAsset?.uri}
                      className="w-full h-full object-cover"
                      alt=""
                    />
                    <div
                      className="absolute top-4 right-4 w-8 h-8 rounded-md flex items-center justify-center bg-red-500 cursor-pointer"
                      onClick={deleteAnImageObject}
                    >
                      <FaTrash className="text-sm text-white" />
                    </div>
                  </div>
                </React.Fragment>
              )}
            </React.Fragment>
          )}
        </div>
        <div className="w-full flex flex-wrap items-center gap-2 mt-4">
          {initialTags.map((tag, i) => (
            <div
              key={i}
              className={`border border-gray-300 px-2 py-1 rounded-md cursor-pointer ${
                selectedTags.includes(tag) ? "bg-blue-500 text-white" : ""
              }`}
              onClick={() => handleSelectedTags(tag)}
            >
              <p className="text-xs">{tag}</p>
            </div>
          ))}
        </div>
        <button className="w-full bg-blue-700 text-white rounded-md py-3
        " onClick={pushToCloud}>SAVE</button>
      </div>
      {/* right container */}
      <div className="col-span-12 lg:col-span-8 2xl:col-span-9"></div>
    </div>
  );
};

export default CreateTemplate;
