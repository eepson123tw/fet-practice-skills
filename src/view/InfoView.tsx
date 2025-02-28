import infoImg from "/info.webp";
import { useState, useEffect, useRef, FC } from "react";
import { AspectRatio } from "@components/ui/aspect-ratio";
import { Separator } from "@components/ui/separator";
import { Badge } from "@components/ui/badge";
import { Button } from "@components/ui/button";
import { useTheme } from "../store/ThemeContext";
import { cn } from "@lib/utils";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@components/ui/card";

interface Category {
  title: string;
  description: string;
  icon: string;
  examples: string[];
}

// Canvas background component
const CanvasBackground: FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const { theme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    // Set canvas size
    const setCanvasSize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    // Particle class
    class Particle {
      x: number;
      y: number;
      size: number;
      opacity: number;
      speedX: number;
      speedY: number;

      constructor() {
        this.x = 0;
        this.y = 0;
        this.size = 0;
        this.opacity = 0;
        this.speedX = 0;
        this.speedY = 0;
        this.reset();
      }

      reset() {
        if (!canvas) return;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 5 + 1;
        this.opacity = Math.random() * 0.5 + 0.1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
      }

      update() {
        if (!canvas) return;
        this.x += this.speedX;
        this.y += this.speedY;

        if (
          this.x < 0 ||
          this.x > canvas.width ||
          this.y < 0 ||
          this.y > canvas.height
        ) {
          this.reset();
        }
      }

      draw() {
        if (!ctx) return;
        const colorLight = `rgba(59, 130, 246, ${this.opacity})`; // Blue
        const colorDark = `rgba(250, 204, 21, ${this.opacity})`; // Yellow

        ctx.fillStyle = isDark ? colorDark : colorLight;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Create particles
    const particleCount = 50;
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Animation function
    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connecting lines
      ctx.strokeStyle = isDark
        ? "rgba(250, 204, 21, 0.03)"
        : "rgba(59, 130, 246, 0.03)";
      ctx.lineWidth = 1;

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 200) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Update and draw particles
      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", setCanvasSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full z-10 opacity-50 pointer-events-none"
    />
  );
};

const InfoPage: FC = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const categories: Category[] = [
    {
      title: "Canvas",
      description: "Interactive visual experiences using the HTML Canvas API",
      icon: "🎨",
      examples: [
        "Particle systems",
        "Music visualizations",
        "Interactive drawings",
      ],
    },
    {
      title: "Browser APIs",
      description: "Modern browser capabilities for enhanced web applications",
      icon: "🌐",
      examples: ["Clipboard integration", "Media queries", "File handling"],
    },
    {
      title: "JavaScript",
      description: "Advanced JS techniques and interactive components",
      icon: "⚡",
      examples: ["Animations", "Async operations", "DOM manipulation"],
    },
    {
      title: "CSS",
      description: "Stunning visual effects and responsive layouts",
      icon: "✨",
      examples: ["Hover interactions", "Text effects", "Advanced layouts"],
    },
  ];

  return (
    <>
      <CanvasBackground />

      <div
        className={cn(
          "max-w-5xl mx-auto p-4 transition-all duration-500 relative",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
        )}
      >
        <Card
          className={cn(
            "overflow-hidden",
            isDark
              ? "bg-gray-900/90 shadow-xl shadow-yellow-300/10"
              : "bg-white/95 shadow-xl shadow-blue-500/5",
          )}
        >
          <CardHeader className="pb-0">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div
                className={cn(
                  "relative w-full md:w-[350px] overflow-hidden rounded-lg",
                  "transition-all duration-500 transform",
                  isDark
                    ? "ring-2 ring-yellow-500/20"
                    : "ring-2 ring-blue-500/20",
                  isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95",
                )}
              >
                <AspectRatio ratio={4 / 3} className="bg-muted">
                  <img
                    src={infoImg}
                    alt="Frontend Developer Skills"
                    className={cn(
                      "rounded-md object-cover h-full w-full",
                      "transition-transform duration-10000",
                      "hover:scale-105",
                    )}
                  />
                  <div
                    className={cn(
                      "absolute inset-0 bg-gradient-to-t opacity-70 pointer-events-none",
                      isDark
                        ? "from-yellow-900/60 to-transparent"
                        : "from-blue-900/60 to-transparent",
                    )}
                  />
                  <div className="absolute bottom-4 left-4 right-4">
                    <Badge
                      className={cn(
                        "px-3 py-1 text-sm font-medium mb-2",
                        isDark
                          ? "bg-yellow-600 hover:bg-yellow-500"
                          : "bg-blue-600 hover:bg-blue-500",
                      )}
                    >
                      Frontend Practice Skills
                    </Badge>
                    <p className="text-white text-opacity-90 text-sm">
                      A curated collection of interactive demos
                    </p>
                  </div>
                </AspectRatio>
              </div>

              <div className="flex-1 space-y-2">
                <div
                  className={cn(
                    "transition-all duration-500 delay-100",
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-5",
                  )}
                >
                  <CardTitle
                    className={cn(
                      "text-3xl font-bold tracking-tight mb-2",
                      isDark ? "text-yellow-300" : "text-blue-700",
                    )}
                  >
                    About My Project
                  </CardTitle>
                  <div className="flex items-center mb-3 gap-2">
                    <div
                      className={cn(
                        "rounded-full overflow-hidden h-10 w-10 flex items-center justify-center",
                        isDark
                          ? "bg-gradient-to-br from-yellow-600 to-amber-700"
                          : "bg-gradient-to-br from-blue-500 to-indigo-700",
                        "text-white shadow-lg",
                      )}
                    >
                      <span className="text-sm font-bold">AS</span>
                    </div>
                    <div>
                      <p
                        className={cn(
                          "text-sm font-medium",
                          isDark ? "text-yellow-100" : "text-blue-900",
                        )}
                      >
                        Aaron Shih
                      </p>
                      <p
                        className={cn(
                          "text-xs",
                          isDark ? "text-yellow-200/70" : "text-blue-700/80",
                        )}
                      >
                        Frontend Developer
                      </p>
                    </div>
                  </div>
                </div>

                <CardDescription
                  className={cn(
                    "text-base transition-all duration-500 delay-200",
                    isDark ? "text-amber-100/80" : "text-blue-800/80",
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-5",
                  )}
                >
                  This project showcases my journey in frontend development,
                  featuring a meticulously curated collection of interactive
                  demonstrations and practical examples. Created to enhance my
                  skills and help other developers, this repository spans
                  various domains of modern web development.
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent
            className={cn(
              "pt-6 transition-all duration-500 delay-300",
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-5",
            )}
          >
            <h3
              className={cn(
                "text-xl font-semibold mb-4",
                isDark ? "text-yellow-300" : "text-blue-700",
              )}
            >
              Explore Categories
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {categories.map((category, index) => (
                <div
                  key={category.title}
                  className={cn(
                    "p-4 rounded-lg transition-all duration-500",
                    "transform hover:-translate-y-1 hover:shadow-md",
                    isDark
                      ? "bg-gray-800/90 hover:bg-gray-700/90 shadow-yellow-300/5 border border-yellow-500/10"
                      : "bg-white/90 hover:bg-white shadow-sm border border-blue-500/10",
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-5",
                    "transition-all duration-500",
                  )}
                  style={{
                    transitionDelay: `${300 + index * 100}ms`,
                  }}
                >
                  <div className="flex items-start">
                    <div
                      className={cn(
                        "text-2xl mr-3 p-2 rounded-md",
                        isDark
                          ? "bg-gradient-to-br from-yellow-700/50 to-amber-800/50"
                          : "bg-gradient-to-br from-blue-100 to-indigo-100/50",
                      )}
                    >
                      {category.icon}
                    </div>
                    <div>
                      <h4
                        className={cn(
                          "font-medium text-lg",
                          isDark ? "text-yellow-200" : "text-blue-800",
                        )}
                      >
                        {category.title}
                      </h4>
                      <p
                        className={cn(
                          "text-sm mt-1 mb-2",
                          isDark ? "text-amber-100/70" : "text-blue-700/70",
                        )}
                      >
                        {category.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {category.examples.map((example) => (
                          <Badge
                            key={example}
                            variant="outline"
                            className={cn(
                              "text-xs",
                              isDark
                                ? "border-yellow-700/30 bg-yellow-900/20 text-yellow-200"
                                : "border-blue-200 bg-blue-50 text-blue-700",
                            )}
                          >
                            {example}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Separator
              className={cn(
                "my-6",
                isDark ? "bg-yellow-700/30" : "bg-blue-200/50",
              )}
            />

            <div
              className={cn(
                "transition-all duration-500",
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-5",
              )}
              style={{ transitionDelay: "700ms" }}
            >
              <h3
                className={cn(
                  "text-xl font-semibold mb-3",
                  isDark ? "text-yellow-300" : "text-blue-700",
                )}
              >
                Purpose and Benefits
              </h3>

              <div
                className={cn(
                  "prose max-w-none",
                  isDark
                    ? "prose-headings:text-yellow-200 prose-strong:text-yellow-200 prose-amber"
                    : "prose-headings:text-blue-700 prose-strong:text-blue-700 prose-blue",
                  isDark ? "text-amber-100/90" : "text-blue-900/80",
                )}
              >
                <p>
                  This project serves as both a personal skill development
                  journey and a valuable resource for the web development
                  community. As I continue to explore and master new frontend
                  techniques, I've created these demonstrations to:
                </p>

                <ul
                  className={cn(
                    "mt-2 space-y-1 list-disc pl-5",
                    isDark ? "marker:text-yellow-400" : "marker:text-blue-500",
                  )}
                >
                  <li>
                    Document my learning process and growth as a developer
                  </li>
                  <li>
                    Provide practical, working examples for developers at all
                    levels
                  </li>
                  <li>
                    Showcase modern implementation techniques for common UI
                    patterns
                  </li>
                  <li>
                    Create a reference library for solving specific frontend
                    challenges
                  </li>
                  <li>
                    Help other developers overcome technical hurdles more
                    efficiently
                  </li>
                </ul>

                <p className="mt-3">
                  By organizing projects into clear categories with detailed
                  descriptions, I've designed this collection to facilitate easy
                  exploration and learning. Whether you're looking to master
                  Canvas animations, implement the latest browser APIs, deepen
                  your JavaScript knowledge, or create stunning CSS effects,
                  you'll find practical examples to advance your skills.
                </p>
              </div>
            </div>
          </CardContent>

          <CardFooter
            className={cn(
              "flex flex-wrap gap-4 transition-all duration-500 border-t",
              isDark ? "border-yellow-700/30" : "border-blue-200/50",
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-5",
            )}
            style={{ transitionDelay: "800ms" }}
          >
            <div className="flex-1">
              <p
                className={cn(
                  "text-sm",
                  isDark ? "text-yellow-200/70" : "text-blue-700/70",
                )}
              >
                Have questions or suggestions? Feel free to reach out!
              </p>
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className={cn(
                  isDark
                    ? "border-yellow-700/50 bg-yellow-900/20 hover:bg-yellow-800/30 text-yellow-200"
                    : "border-blue-300 bg-blue-50 hover:bg-blue-100 text-blue-700",
                )}
                onClick={() =>
                  window.open(
                    "https://github.com/eepson123tw/fet-practice-skills",
                    "_blank",
                  )
                }
              >
                GitHub Repository
              </Button>

              <Button
                size="sm"
                className={cn(
                  isDark
                    ? "bg-gradient-to-r from-yellow-600 to-amber-600 hover:from-yellow-500 hover:to-amber-500"
                    : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500",
                  "text-white",
                )}
              >
                Explore Demos
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default InfoPage;
