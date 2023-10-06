'use client';
import { Empty } from '@/components/empty';
import Heading from '@/components/heading';
import { Loader } from '@/components/loader';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { Divide, ImageIcon } from 'lucide-react';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// Define the CaptionGenerationPage component
const CaptionGenerationPage = () => {
  const [image, setImage] = useState(null);
  const [captions, setCaptions] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);

  const handleImageUpload = (event: any) => {
    const file = event.target.files[0];
    setImage(file);
  };

  const handleSubmit = async () => {
    try {
      setCaptions(null);
      setIsLoading(true);
      const formData: any = new FormData();
      formData.append('file', image);

      const response = await axios.post(
        'http://localhost:8000/predict',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.data && response.data.caption.length > 0) {
        console.log(response.data.caption[0]);
        const userMessage = {
          role: 'user',
          content: response.data.caption[0],
        };
        const res: any = await axios.post('/api/conversation', {
          messages: [userMessage],
        });
        console.log(res.data.content);
        setCaptions(res.data.content.split('\n'));
      } else {
        setCaptions('No captions generated.');
      }
    } catch (error) {
      console.error('Error:', error);
      setCaptions('Error occurred while generating captions.');
    } finally {
      setIsLoading(false);
    }
  };

  console.log(captions);

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
        <Button onClick={handleSubmit}>Generate Caption</Button>
      </div>
      {/* <div className="px-4 lg:px-8 flex items-center gap-x-3 mb-8 justify-between">
        <input type="file" accept="image/*" onChange={handleImageUpload} />
      </div> */}
      <div className="px-4 lg:px-8 divide-y space-y-4">
        {captions?.map((caption: string) => (
          <p key={caption} className="my-2">
            {caption}
          </p>
        ))}
      </div>
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
