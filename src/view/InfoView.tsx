import infoImg from "@public/info.webp";
import { AspectRatio } from "@components/ui/aspect-ratio";
import { Separator } from "@components/ui/separator";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@components/ui/card";

const InfoPage = () => {
  return (
    <Card className="p-2">
      <CardHeader>
        <CardTitle className="mb-2">About the Project</CardTitle>
        <div className='mb-2 w-[300px] h-[300px]'>
            <AspectRatio ratio={16 / 9}>
              <img
                src={infoImg}
                alt="Image"
                className="rounded-md object-cover"
              ></img>
            </AspectRatio>
        </div>
        <CardDescription>
          This project is a meticulously curated collection of web development
          resources and interactive demonstrations, designed to enhance learning
          and provide practical examples across various domains of front-end
          development. The resources are organized into four main categories,
          each focusing on a specific area of web technology:
        </CardDescription>
      </CardHeader>
      <CardContent>
        <CardTitle className="mb-2">Purpose and Benefits</CardTitle>
        This project serves as a valuable repository for web developers of all
        levels, offering practical examples and inspiration for building
        sophisticated web applications. Whether you're looking to master the
        Canvas API, explore the latest browser APIs, deepen your JavaScript
        knowledge, or create stunning CSS effects, this collection provides the
        resources you need to advance your skills and enhance your projects.
        <Separator className="my-2" />
        By organizing projects into clear categories and providing detailed
        descriptions, the project facilitates easy exploration and learning,
        making it an essential tool for continuous development and innovation in
        the ever-evolving landscape of web technology.
      </CardContent>
    </Card>
  );
};

export default InfoPage;
