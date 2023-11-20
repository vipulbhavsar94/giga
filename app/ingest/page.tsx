"use client";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { LetterCaseCapitalizeIcon } from "@radix-ui/react-icons";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { useState } from "react";

export default function IngestionForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    schoolName: "",
    province: "",
    schoolType: "primary",
    latitude: null,
    longitude: null,
    internetSpeed: null,
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      Object.values(formData).every((value) => value !== "" && value !== null)
    ) {
      const existingDataString = localStorage.getItem("formData");
      let existingData;
      if (existingDataString) {
        existingData = JSON.parse(existingDataString);
      } else {
        existingData = [];
      }
      existingData.push(formData);

      // Save the updated array back to local storage
      localStorage.setItem("formData", JSON.stringify(existingData.reverse()));
      toast.success("Successfully added school");
      setTimeout(() => {
        router.push("/");
      }, 500);
    } else {
      toast.error("Please make sure all the required fields are present");
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log("formData", formData, e.target.value);
  };

  return (
    <div className="py-10 lg:pl-72 bg-white">
      <form className="px-4 sm:px-6 lg:px-8" onSubmit={handleSave} noValidate>
        <div className="space-y-12 sm:space-y-16">
          <div>
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              School Information
            </h2>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-600">
              This information will be displayed publicly so be careful what you
              share.
            </p>

            <div className="mt-10 space-y-8 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0">
              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                <label className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                  School Name *
                </label>
                <div className="mt-2 sm:col-span-2 sm:mt-0">
                  <div className="flex rounded shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      required
                      type="text"
                      name="schoolName"
                      id="school-name"
                      autoComplete="school-name"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Hines Inc School"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                <label className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                  State / Province *
                </label>
                <div className="mt-2 sm:col-span-2 sm:mt-0">
                  <input
                    required
                    type="text"
                    onChange={handleInputChange}
                    name="province"
                    id="province"
                    className="block w-full rounded border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                <label className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                  Type of school *
                </label>
                <div className="mt-2 sm:col-span-2 sm:mt-0">
                  <select
                    required
                    id="type"
                    name="type"
                    onChange={handleInputChange}
                    className="block w-full rounded border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option value={"primary"}>Primary School</option>
                    <option value={"secondary"}>Secondary School</option>
                    <option value={"high"}>High School</option>
                  </select>
                </div>
              </div>

              <fieldset>
                <legend className="sr-only">Push Notifications</legend>
                <div className="sm:grid sm:grid-cols-3 sm:items-baseline sm:gap-4 sm:py-6">
                  <div
                    className="text-sm font-semibold leading-6 text-gray-900"
                    aria-hidden="true"
                  >
                    School connectivity *
                  </div>
                  <div className="mt-1 sm:col-span-2 sm:mt-0">
                    <div className="max-w-lg">
                      <p className="text-sm leading-6 text-gray-600">
                        Please select if the school is connected to internet or
                        not
                      </p>
                      <div className="mt-6 space-y-3">
                        <div className="flex items-center gap-x-3">
                          <input
                            required
                            onChange={handleInputChange}
                            id="online"
                            name="schoolConnectivity"
                            type="radio"
                            value={"online"}
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          />
                          <label className="block text-sm font-medium leading-6 text-gray-900">
                            Online
                          </label>
                        </div>
                        <div className="flex items-center gap-x-3">
                          <input
                            required
                            onChange={handleInputChange}
                            id="offline"
                            name="schoolConnectivity"
                            type="radio"
                            value={"offline"}
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          />
                          <label className="block text-sm font-medium leading-6 text-gray-900">
                            Offline
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </fieldset>

              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                <label className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                  Latitude
                </label>
                <div className="mt-2 sm:col-span-2 sm:mt-0">
                  <input
                    onChange={handleInputChange}
                    type="number"
                    name="latitude"
                    id="latitude"
                    className="block w-full rounded border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                <label className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                  Longitude
                </label>
                <div className="mt-2 sm:col-span-2 sm:mt-0">
                  <input
                    onChange={handleInputChange}
                    type="number"
                    name="longitude"
                    id="longitude"
                    className="block w-full rounded border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                <label className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                  Internet Speed(in MB per second) *
                </label>
                <div className="mt-2 sm:col-span-2 sm:mt-0">
                  <input
                    onChange={handleInputChange}
                    required
                    type="number"
                    name="internetSpeed"
                    id="internet-speed"
                    className="block w-full rounded border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                <label className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                  School photo
                </label>
                <div className="mt-2 sm:col-span-2 sm:mt-0">
                  <div className="flex max-w-2xl justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                    <div className="text-center">
                      <PhotoIcon
                        className="mx-auto h-12 w-12 text-gray-300"
                        aria-hidden="true"
                      />
                      <div className="mt-4 flex text-sm leading-6 text-gray-600">
                        <label className="relative cursor-pointer rounded bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                          <span>Upload a file</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs leading-5 text-gray-600">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center gap-x-6">
          <button
            type="submit"
            className="inline-flex justify-center rounded bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
