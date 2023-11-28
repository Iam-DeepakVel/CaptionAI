"use client";
import { Empty } from "@/components/empty";
import Heading from "@/components/heading";
import { Loader } from "@/components/loader";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { ImageIcon } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { numberOfCaptionsOptions, wordLimitOptions } from "./constants";
import { BsStars } from "react-icons/bs";
import { Patrick_Hand } from "next/font/google";
import CaptionCard from "@/components/captionCard";
import { RxCrossCircled } from "react-icons/rx";
import { removeSerialNumbersAndQuotes } from "@/lib/utils";

const patrick_Hand = Patrick_Hand({ weight: "400", subsets: ["latin"] });

const CaptionGenerationPage = () => {
  const [image, setImage] = useState(null);
  const [captions, setCaptions] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);

  const [previewImage, setPreviewImage] = useState("");

  const [prompt, setPrompt] = useState("");
  const [numberOfCaptions, setNumberOfCaptions] = useState("3");
  const [wordLimit, setWordLimit] = useState("5");

  const [error, setError] = useState("");

  const handleImageUpload = (event: any) => {
    setError("");
    const file = event.target.files[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
    }

    setImage(file);
  };

  const handleSubmit = async () => {
    try {
      setCaptions(null);
      setIsLoading(true);

      if (!image) {
        setError("Please choose an image first!");
        return;
      }

      const formData: any = new FormData();
      formData.append("file", image);

      const response = await axios.post(
        "http://localhost:8000/predict",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data && response.data.caption.length > 0) {
        console.log(response.data.caption[0]);

        const userMessage = {
          role: "user",
          content: response.data.caption[0],
        };

        const res: any = await axios.post("/api/conversation", {
          messages: [userMessage],
          prompt,
          numberOfCaptions,
          wordLimit,
        });

        const captionsString = res.data.content;

        const cleanedCaptions = removeSerialNumbersAndQuotes(captionsString);

        setCaptions(cleanedCaptions.split("\n"));
      } else {
        setCaptions(null);
      }
    } catch (error) {
      console.error("Error:", error);
      setCaptions(null);
      setError("Sorry! Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Heading
        title="Image Caption Generation"
        description="Generate caption for your image."
        icon={ImageIcon}
        iconColor="text-pink-700"
        bgColor="bg-pink-700/10"
      />
      <div className="px-4 lg:px-8 flex items-center gap-x-3 mb-8 justify-between">
        {previewImage && (
          <div className="mt-4 flex gap-2">
            <img
              src={previewImage}
              alt="Selected Image"
              className="w-auto h-64 rounded-lg"
            />

            <RxCrossCircled
              onClick={() => {
                setPreviewImage("");
                setImage(null);
              }}
              size={24}
              className="text-red-500 cursor-pointer"
            />
          </div>
        )}
        {!previewImage && (
          <div className="space-y-2 w-full md:w-1/4">
            <Label htmlFor="picture">Picture</Label>
            <Input
              id="picture"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full"
            />
          </div>
        )}
        <Button onClick={handleSubmit}>Generate Caption</Button>
      </div>

      {/* User Custom Input Section */}
      <section className="px-4 lg:px-8">
        <div className="rounded-lg border border-gray-800 w-full p-4  focus-within:shadow-md focus-within:shadow-purple-500/10 grid grid-cols-12 gap-2">
          <Input
            className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent col-span-12 lg:col-span-6"
            disabled={isLoading}
            placeholder={`Give me ${numberOfCaptions} awesome captions with limit of ${wordLimit} words!`}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <div className="col-span-12 lg:col-span-3">
            <Select
              disabled={isLoading || !!prompt}
              onValueChange={(value) => setNumberOfCaptions(value)}
              value={numberOfCaptions}
              defaultValue={numberOfCaptions}
            >
              <SelectTrigger>
                <SelectValue defaultValue="" />
              </SelectTrigger>

              <SelectContent>
                {numberOfCaptionsOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="col-span-12 lg:col-span-3">
            <Select
              disabled={isLoading || !!prompt}
              onValueChange={(value) => setWordLimit(value)}
              value={wordLimit}
              defaultValue={wordLimit}
            >
              <SelectTrigger>
                <SelectValue defaultValue="" />
              </SelectTrigger>

              <SelectContent>
                {wordLimitOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Captions generation section */}
      {captions && (
        <div className="px-4 md:px-8 my-6">
          {/* Heading */}
          <div className=" flex items-center gap-1 text-red-600 mb-4">
            <BsStars />
            <p className=" text-red-600">Captions for you!</p>
          </div>

          <div className="space-y-4">
            {/* Captions */}
            {captions.map((caption: string, index: number) => (
              <CaptionCard
                key={index}
                caption={caption}
                index={index}
                patrick_Hand={patrick_Hand.className}
              />
            ))}
          </div>
        </div>
      )}

      {error && (
        <p className="text-md text-red-500 px-4 md:px-8 my-4">{error}</p>
      )}

      <div className="space-y-4 mt-4">
        {isLoading && (
          <div className="p-20">
            <Loader />
          </div>
        )}
        {!captions && !isLoading && <Empty label="No captions generated" />}
      </div>
    </div>
  );
};

export default CaptionGenerationPage;
