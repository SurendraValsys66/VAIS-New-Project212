import React, { useState } from "react";
import { LandingPageBlock } from "./types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Trash2, ChevronDown, ChevronUp } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface EnhancedSettingsPanelProps {
  block: LandingPageBlock | null;
  onBlockUpdate: (block: LandingPageBlock) => void;
  onBlockDelete: () => void;
}

interface ColorPickerProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ value, onChange, label }) => (
  <div>
    <Label className="text-xs font-semibold text-gray-700 mb-2 block">
      {label}
    </Label>
    <div className="flex gap-2">
      <Input
        type="color"
        value={value || "#000000"}
        onChange={(e) => onChange(e.target.value)}
        className="w-12 h-10 cursor-pointer"
      />
      <Input
        type="text"
        value={value || "#000000"}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 focus:ring-valasys-orange focus:ring-2"
        placeholder="#000000"
      />
    </div>
  </div>
);

const NumberInput: React.FC<{
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  unit?: string;
  step?: number;
  min?: number;
  max?: number;
}> = ({ label, value, onChange, unit = "", step = 1, min, max }) => (
  <div>
    <Label className="text-xs font-semibold text-gray-700 mb-2 block">
      {label}
    </Label>
    <div className="flex gap-2">
      <Input
        type="number"
        step={step}
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1"
      />
      {unit && <span className="flex items-center text-xs text-gray-500">{unit}</span>}
    </div>
  </div>
);

const SpacingInput: React.FC<{
  label: string;
  value: string | number;
  unit: "px" | "%";
  onValueChange: (value: string) => void;
  onUnitChange: (unit: "px" | "%") => void;
}> = ({ label, value, unit, onValueChange, onUnitChange }) => (
  <div className="flex gap-1 items-center">
    <span className="text-xs text-gray-500 w-4">⊞</span>
    <Input
      type="number"
      value={value}
      onChange={(e) => onValueChange(e.target.value)}
      className="w-12 text-xs h-8"
    />
    <Select value={unit} onValueChange={(val) => onUnitChange(val as "px" | "%")}>
      <SelectTrigger className="w-14 h-8">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="px">px</SelectItem>
        <SelectItem value="%">%</SelectItem>
      </SelectContent>
    </Select>
    <div className="flex flex-col gap-0">
      <button
        onClick={() => {
          const current = Number(value || "0");
          onValueChange(String(current + 1));
        }}
        className="text-xs text-gray-600 hover:text-gray-900 leading-none"
      >
        ▲
      </button>
      <button
        onClick={() => {
          const current = Number(value || "0");
          onValueChange(String(Math.max(0, current - 1)));
        }}
        className="text-xs text-gray-600 hover:text-gray-900 leading-none"
      >
        ▼
      </button>
    </div>
  </div>
);

export const EnhancedSettingsPanel: React.FC<EnhancedSettingsPanelProps> = ({
  block,
  onBlockUpdate,
  onBlockDelete,
}) => {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(["content"])
  );

  if (!block) {
    return (
      <div className="bg-white border-l border-gray-200 p-4 h-full flex items-center justify-center">
        <p className="text-gray-500 text-sm text-center">
          Select a block to edit properties and styling
        </p>
      </div>
    );
  }

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(section)) {
      newExpanded.delete(section);
    } else {
      newExpanded.add(section);
    }
    setExpandedSections(newExpanded);
  };

  const props = block.properties;

  const renderContentSettings = () => {
    switch (block.type) {
      case "header":
        return (
          <div className="space-y-4">
            <div>
              <Label className="text-xs font-semibold text-gray-700 mb-2 block">
                Logo Text
              </Label>
              <Input
                type="text"
                value={props.logoText || ""}
                onChange={(e) =>
                  onBlockUpdate({
                    ...block,
                    properties: { ...props, logoText: e.target.value },
                  })
                }
                placeholder="Your Logo"
              />
            </div>
            <div>
              <Label className="text-xs font-semibold text-gray-700 mb-2 block">
                CTA Button Text
              </Label>
              <Input
                type="text"
                value={props.ctaButtonText || ""}
                onChange={(e) =>
                  onBlockUpdate({
                    ...block,
                    properties: { ...props, ctaButtonText: e.target.value },
                  })
                }
                placeholder="Get Started"
              />
            </div>
          </div>
        );

      case "hero":
        return (
          <div className="space-y-4">
            <div>
              <Label className="text-xs font-semibold text-gray-700 mb-2 block">
                Headline
              </Label>
              <Input
                type="text"
                value={props.headline || ""}
                onChange={(e) =>
                  onBlockUpdate({
                    ...block,
                    properties: { ...props, headline: e.target.value },
                  })
                }
                placeholder="Your Headline"
              />
            </div>
            <div>
              <Label className="text-xs font-semibold text-gray-700 mb-2 block">
                Subheading
              </Label>
              <Input
                type="text"
                value={props.subheading || ""}
                onChange={(e) =>
                  onBlockUpdate({
                    ...block,
                    properties: { ...props, subheading: e.target.value },
                  })
                }
                placeholder="Your subheading"
              />
            </div>
            <div>
              <Label className="text-xs font-semibold text-gray-700 mb-2 block">
                CTA Button Text
              </Label>
              <Input
                type="text"
                value={props.ctaButtonText || ""}
                onChange={(e) =>
                  onBlockUpdate({
                    ...block,
                    properties: { ...props, ctaButtonText: e.target.value },
                  })
                }
                placeholder="Learn More"
              />
            </div>
          </div>
        );

      case "features":
        return (
          <div className="space-y-4">
            <div>
              <Label className="text-xs font-semibold text-gray-700 mb-2 block">
                Heading
              </Label>
              <Input
                type="text"
                value={props.heading || ""}
                onChange={(e) =>
                  onBlockUpdate({
                    ...block,
                    properties: { ...props, heading: e.target.value },
                  })
                }
              />
            </div>
            <div>
              <Label className="text-xs font-semibold text-gray-700 mb-2 block">
                Description
              </Label>
              <textarea
                value={props.description || ""}
                onChange={(e) =>
                  onBlockUpdate({
                    ...block,
                    properties: { ...props, description: e.target.value },
                  })
                }
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-valasys-orange"
                rows={2}
              />
            </div>
            <div>
              <Label className="text-xs font-semibold text-gray-700 mb-2 block">
                Number of Columns
              </Label>
              <Select
                value={String(props.columns || 4)}
                onValueChange={(val) =>
                  onBlockUpdate({
                    ...block,
                    properties: { ...props, columns: parseInt(val) },
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3">3 Columns</SelectItem>
                  <SelectItem value="4">4 Columns</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case "testimonials":
        return (
          <div className="space-y-4">
            <div>
              <Label className="text-xs font-semibold text-gray-700 mb-2 block">
                Section Heading
              </Label>
              <Input
                type="text"
                value={props.heading || ""}
                onChange={(e) =>
                  onBlockUpdate({
                    ...block,
                    properties: { ...props, heading: e.target.value },
                  })
                }
                placeholder="What Our Clients Say"
              />
            </div>
          </div>
        );

      case "about":
        return (
          <div className="space-y-4">
            <div>
              <Label className="text-xs font-semibold text-gray-700 mb-2 block">
                Heading
              </Label>
              <Input
                type="text"
                value={props.heading || ""}
                onChange={(e) =>
                  onBlockUpdate({
                    ...block,
                    properties: { ...props, heading: e.target.value },
                  })
                }
              />
            </div>
            <div>
              <Label className="text-xs font-semibold text-gray-700 mb-2 block">
                Content
              </Label>
              <textarea
                value={props.content || ""}
                onChange={(e) =>
                  onBlockUpdate({
                    ...block,
                    properties: { ...props, content: e.target.value },
                  })
                }
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-valasys-orange"
                rows={3}
              />
            </div>
            <div>
              <Label className="text-xs font-semibold text-gray-700 mb-2 block">
                Image Position
              </Label>
              <Select
                value={props.imagePosition || "left"}
                onValueChange={(val) =>
                  onBlockUpdate({
                    ...block,
                    properties: { ...props, imagePosition: val },
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="left">Left</SelectItem>
                  <SelectItem value="right">Right</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case "contact-form":
        return (
          <div className="space-y-4">
            <div>
              <Label className="text-xs font-semibold text-gray-700 mb-2 block">
                Heading
              </Label>
              <Input
                type="text"
                value={props.heading || ""}
                onChange={(e) =>
                  onBlockUpdate({
                    ...block,
                    properties: { ...props, heading: e.target.value },
                  })
                }
              />
            </div>
            <div>
              <Label className="text-xs font-semibold text-gray-700 mb-2 block">
                Description
              </Label>
              <Input
                type="text"
                value={props.description || ""}
                onChange={(e) =>
                  onBlockUpdate({
                    ...block,
                    properties: { ...props, description: e.target.value },
                  })
                }
              />
            </div>
            <div>
              <Label className="text-xs font-semibold text-gray-700 mb-2 block">
                Submit Button Text
              </Label>
              <Input
                type="text"
                value={props.submitButtonText || ""}
                onChange={(e) =>
                  onBlockUpdate({
                    ...block,
                    properties: { ...props, submitButtonText: e.target.value },
                  })
                }
              />
            </div>
          </div>
        );

      case "footer":
        return (
          <div className="space-y-4">
            <div>
              <Label className="text-xs font-semibold text-gray-700 mb-2 block">
                Company Name
              </Label>
              <Input
                type="text"
                value={props.companyName || ""}
                onChange={(e) =>
                  onBlockUpdate({
                    ...block,
                    properties: { ...props, companyName: e.target.value },
                  })
                }
              />
            </div>
            <div>
              <Label className="text-xs font-semibold text-gray-700 mb-2 block">
                Description
              </Label>
              <textarea
                value={props.companyDescription || ""}
                onChange={(e) =>
                  onBlockUpdate({
                    ...block,
                    properties: { ...props, companyDescription: e.target.value },
                  })
                }
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-valasys-orange"
                rows={2}
              />
            </div>
            <div>
              <Label className="text-xs font-semibold text-gray-700 mb-2 block">
                Email
              </Label>
              <Input
                type="email"
                value={props.email || ""}
                onChange={(e) =>
                  onBlockUpdate({
                    ...block,
                    properties: { ...props, email: e.target.value },
                  })
                }
              />
            </div>
            <div>
              <Label className="text-xs font-semibold text-gray-700 mb-2 block">
                Phone
              </Label>
              <Input
                type="tel"
                value={props.phone || ""}
                onChange={(e) =>
                  onBlockUpdate({
                    ...block,
                    properties: { ...props, phone: e.target.value },
                  })
                }
              />
            </div>
          </div>
        );

      case "pricing":
        return (
          <div className="space-y-4">
            <div>
              <Label className="text-xs font-semibold text-gray-700 mb-2 block">
                Section Heading
              </Label>
              <Input
                type="text"
                value={props.heading || ""}
                onChange={(e) =>
                  onBlockUpdate({
                    ...block,
                    properties: { ...props, heading: e.target.value },
                  })
                }
                placeholder="Our Pricing"
              />
            </div>
            <div>
              <Label className="text-xs font-semibold text-gray-700 mb-2 block">
                Subheading
              </Label>
              <Input
                type="text"
                value={props.subheading || ""}
                onChange={(e) =>
                  onBlockUpdate({
                    ...block,
                    properties: { ...props, subheading: e.target.value },
                  })
                }
                placeholder="Choose the right plan for your needs"
              />
            </div>
          </div>
        );

      case "faq":
        return (
          <div className="space-y-4">
            <div>
              <Label className="text-xs font-semibold text-gray-700 mb-2 block">
                Section Heading
              </Label>
              <Input
                type="text"
                value={props.heading || ""}
                onChange={(e) =>
                  onBlockUpdate({
                    ...block,
                    properties: { ...props, heading: e.target.value },
                  })
                }
                placeholder="Frequently Asked Questions"
              />
            </div>
          </div>
        );

      case "signup":
        return (
          <div className="space-y-4">
            <div>
              <Label className="text-xs font-semibold text-gray-700 mb-2 block">
                Heading
              </Label>
              <Input
                type="text"
                value={props.heading || ""}
                onChange={(e) =>
                  onBlockUpdate({
                    ...block,
                    properties: { ...props, heading: e.target.value },
                  })
                }
                placeholder="Sign Up Today"
              />
            </div>
            <div>
              <Label className="text-xs font-semibold text-gray-700 mb-2 block">
                Subheading
              </Label>
              <Input
                type="text"
                value={props.subheading || ""}
                onChange={(e) =>
                  onBlockUpdate({
                    ...block,
                    properties: { ...props, subheading: e.target.value },
                  })
                }
                placeholder="Get started with our service"
              />
            </div>
            <div>
              <Label className="text-xs font-semibold text-gray-700 mb-2 block">
                Button Text
              </Label>
              <Input
                type="text"
                value={props.buttonText || ""}
                onChange={(e) =>
                  onBlockUpdate({
                    ...block,
                    properties: { ...props, buttonText: e.target.value },
                  })
                }
                placeholder="Get Started"
              />
            </div>
          </div>
        );

      case "section":
      case "row":
      case "column":
        return (
          <div className="space-y-2 text-sm text-gray-500">
            <p>Layout blocks use styling controls below.</p>
            <p>Adjust colors, spacing, and dimensions in the Styling & Spacing tabs.</p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-white border-l border-gray-200 h-full flex flex-col overflow-hidden">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between flex-shrink-0">
        <h3 className="font-semibold text-gray-900 text-sm capitalize">
          {block.type.replace("-", " ")} Settings
        </h3>
        <Button
          size="sm"
          variant="ghost"
          className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600"
          onClick={onBlockDelete}
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <Tabs defaultValue="content" className="w-full">
          <TabsList className="w-full justify-start rounded-none border-b bg-gray-50 px-4 h-10">
            <TabsTrigger value="content" className="rounded-none border-b-2">
              Content
            </TabsTrigger>
            <TabsTrigger value="styling" className="rounded-none border-b-2">
              Styling
            </TabsTrigger>
            <TabsTrigger value="spacing" className="rounded-none border-b-2">
              Spacing
            </TabsTrigger>
          </TabsList>

          {/* Content Tab */}
          <TabsContent value="content" className="p-4 space-y-4">
            {renderContentSettings()}
          </TabsContent>

          {/* Styling Tab */}
          <TabsContent value="styling" className="p-4 space-y-4">
            {/* Colors Section */}
            <div>
              <div
                className="flex items-center justify-between cursor-pointer mb-3 pb-3 border-b"
                onClick={() => toggleSection("colors")}
              >
                <span className="text-xs font-semibold text-gray-700">
                  Colors
                </span>
                {expandedSections.has("colors") ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </div>
              {expandedSections.has("colors") && (
                <div className="space-y-3">
                  <ColorPicker
                    label="Background Color"
                    value={props.backgroundColor || "#ffffff"}
                    onChange={(value) =>
                      onBlockUpdate({
                        ...block,
                        properties: { ...props, backgroundColor: value },
                      })
                    }
                  />
                  <ColorPicker
                    label="Text Color"
                    value={props.textColor || "#000000"}
                    onChange={(value) =>
                      onBlockUpdate({
                        ...block,
                        properties: { ...props, textColor: value },
                      })
                    }
                  />
                  <ColorPicker
                    label="Button Color"
                    value={props.submitButtonColor || "#FF6A00"}
                    onChange={(value) =>
                      onBlockUpdate({
                        ...block,
                        properties: { ...props, submitButtonColor: value },
                      })
                    }
                  />
                  <ColorPicker
                    label="Border Color"
                    value={props.borderColor || "#e5e7eb"}
                    onChange={(value) =>
                      onBlockUpdate({
                        ...block,
                        properties: { ...props, borderColor: value },
                      })
                    }
                  />
                </div>
              )}
            </div>

            {/* Typography Section */}
            <div>
              <div
                className="flex items-center justify-between cursor-pointer mb-3 pb-3 border-b"
                onClick={() => toggleSection("typography")}
              >
                <span className="text-xs font-semibold text-gray-700">
                  Typography
                </span>
                {expandedSections.has("typography") ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </div>
              {expandedSections.has("typography") && (
                <div className="space-y-3">
                  <div>
                    <Label className="text-xs font-semibold text-gray-700 mb-2 block">
                      Font Family
                    </Label>
                    <Select
                      value={props.fontFamily || "system"}
                      onValueChange={(value) =>
                        onBlockUpdate({
                          ...block,
                          properties: { ...props, fontFamily: value },
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="system">System (Sans-serif)</SelectItem>
                        <SelectItem value="serif">Serif</SelectItem>
                        <SelectItem value="mono">Monospace</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <NumberInput
                    label="Font Size"
                    value={props.fontSize || "16"}
                    onChange={(value) =>
                      onBlockUpdate({
                        ...block,
                        properties: { ...props, fontSize: value },
                      })
                    }
                    unit="px"
                  />
                  <div>
                    <Label className="text-xs font-semibold text-gray-700 mb-2 block">
                      Font Weight
                    </Label>
                    <Select
                      value={props.fontWeight || "400"}
                      onValueChange={(value) =>
                        onBlockUpdate({
                          ...block,
                          properties: { ...props, fontWeight: value },
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="300">Light</SelectItem>
                        <SelectItem value="400">Regular</SelectItem>
                        <SelectItem value="600">Semibold</SelectItem>
                        <SelectItem value="700">Bold</SelectItem>
                        <SelectItem value="900">Black</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <NumberInput
                    label="Line Height"
                    value={props.lineHeight || "1.5"}
                    onChange={(value) =>
                      onBlockUpdate({
                        ...block,
                        properties: { ...props, lineHeight: value },
                      })
                    }
                    step={0.1}
                  />
                  <NumberInput
                    label="Letter Spacing"
                    value={props.letterSpacing || "0"}
                    onChange={(value) =>
                      onBlockUpdate({
                        ...block,
                        properties: { ...props, letterSpacing: value },
                      })
                    }
                    unit="px"
                  />
                  <div>
                    <Label className="text-xs font-semibold text-gray-700 mb-2 block">
                      Text Align
                    </Label>
                    <Select
                      value={props.textAlign || "left"}
                      onValueChange={(value) =>
                        onBlockUpdate({
                          ...block,
                          properties: { ...props, textAlign: value },
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="left">Left</SelectItem>
                        <SelectItem value="center">Center</SelectItem>
                        <SelectItem value="right">Right</SelectItem>
                        <SelectItem value="justify">Justify</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-xs font-semibold text-gray-700 mb-2 block">
                      Text Transform
                    </Label>
                    <Select
                      value={props.textTransform || "none"}
                      onValueChange={(value) =>
                        onBlockUpdate({
                          ...block,
                          properties: { ...props, textTransform: value },
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        <SelectItem value="uppercase">Uppercase</SelectItem>
                        <SelectItem value="lowercase">Lowercase</SelectItem>
                        <SelectItem value="capitalize">Capitalize</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
            </div>

            {/* Borders Section */}
            <div>
              <div
                className="flex items-center justify-between cursor-pointer mb-3 pb-3 border-b"
                onClick={() => toggleSection("borders")}
              >
                <span className="text-xs font-semibold text-gray-700">
                  Borders
                </span>
                {expandedSections.has("borders") ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </div>
              {expandedSections.has("borders") && (
                <div className="space-y-3">
                  <NumberInput
                    label="Border Width"
                    value={props.borderWidth || "0"}
                    onChange={(value) =>
                      onBlockUpdate({
                        ...block,
                        properties: { ...props, borderWidth: value },
                      })
                    }
                    unit="px"
                  />
                  <div>
                    <Label className="text-xs font-semibold text-gray-700 mb-2 block">
                      Border Style
                    </Label>
                    <Select
                      value={props.borderStyle || "solid"}
                      onValueChange={(value) =>
                        onBlockUpdate({
                          ...block,
                          properties: { ...props, borderStyle: value },
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        <SelectItem value="solid">Solid</SelectItem>
                        <SelectItem value="dashed">Dashed</SelectItem>
                        <SelectItem value="dotted">Dotted</SelectItem>
                        <SelectItem value="double">Double</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <NumberInput
                    label="Border Radius"
                    value={props.borderRadius || "0"}
                    onChange={(value) =>
                      onBlockUpdate({
                        ...block,
                        properties: { ...props, borderRadius: value },
                      })
                    }
                    unit="px"
                  />
                </div>
              )}
            </div>

            {/* Effects Section */}
            <div>
              <div
                className="flex items-center justify-between cursor-pointer mb-3 pb-3 border-b"
                onClick={() => toggleSection("effects")}
              >
                <span className="text-xs font-semibold text-gray-700">
                  Effects
                </span>
                {expandedSections.has("effects") ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </div>
              {expandedSections.has("effects") && (
                <div className="space-y-3">
                  <div>
                    <Label className="text-xs font-semibold text-gray-700 mb-2 block">
                      Shadow
                    </Label>
                    <Select
                      value={props.shadow || "none"}
                      onValueChange={(value) =>
                        onBlockUpdate({
                          ...block,
                          properties: { ...props, shadow: value },
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        <SelectItem value="sm">Small</SelectItem>
                        <SelectItem value="md">Medium</SelectItem>
                        <SelectItem value="lg">Large</SelectItem>
                        <SelectItem value="xl">Extra Large</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <NumberInput
                    label="Opacity"
                    value={props.opacity || "100"}
                    onChange={(value) =>
                      onBlockUpdate({
                        ...block,
                        properties: { ...props, opacity: value },
                      })
                    }
                    unit="%"
                    min={0}
                    max={100}
                  />
                </div>
              )}
            </div>

            {/* Dimensions Section */}
            <div>
              <div
                className="flex items-center justify-between cursor-pointer mb-3 pb-3 border-b"
                onClick={() => toggleSection("dimensions")}
              >
                <span className="text-xs font-semibold text-gray-700">
                  Dimensions
                </span>
                {expandedSections.has("dimensions") ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </div>
              {expandedSections.has("dimensions") && (
                <div className="space-y-3">
                  <NumberInput
                    label="Min Height"
                    value={props.minHeight || "auto"}
                    onChange={(value) =>
                      onBlockUpdate({
                        ...block,
                        properties: { ...props, minHeight: value },
                      })
                    }
                    unit="px"
                  />
                  <NumberInput
                    label="Max Height"
                    value={props.maxHeight || "auto"}
                    onChange={(value) =>
                      onBlockUpdate({
                        ...block,
                        properties: { ...props, maxHeight: value },
                      })
                    }
                    unit="px"
                  />
                  <NumberInput
                    label="Width"
                    value={props.width || "auto"}
                    onChange={(value) =>
                      onBlockUpdate({
                        ...block,
                        properties: { ...props, width: value },
                      })
                    }
                    unit="px"
                  />
                </div>
              )}
            </div>
          </TabsContent>

          {/* Spacing Tab */}
          <TabsContent value="spacing" className="p-4 space-y-4">
            {/* Padding Section */}
            <div>
              <div
                className="flex items-center justify-between cursor-pointer mb-3 pb-3 border-b"
                onClick={() => toggleSection("padding")}
              >
                <span className="text-xs font-semibold text-gray-700">
                  Padding
                </span>
                {expandedSections.has("padding") ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </div>
              {expandedSections.has("padding") && (
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { key: "paddingTop", label: "T" },
                    { key: "paddingRight", label: "R" },
                    { key: "paddingBottom", label: "B" },
                    { key: "paddingLeft", label: "L" },
                  ].map(({ key, label }) => (
                    <SpacingInput
                      key={key}
                      label={label}
                      value={
                        typeof props[key as keyof typeof props] === "string" &&
                        (props[key as keyof typeof props] as string).includes("%")
                          ? (props[key as keyof typeof props] as string).replace("%", "")
                          : props[key as keyof typeof props] || "0"
                      }
                      unit={
                        typeof props[key as keyof typeof props] === "string" &&
                        (props[key as keyof typeof props] as string).includes("%")
                          ? "%"
                          : "px"
                      }
                      onValueChange={(value) => {
                        const unit =
                          typeof props[key as keyof typeof props] === "string" &&
                          (props[key as keyof typeof props] as string).includes("%")
                            ? "%"
                            : "px";
                        onBlockUpdate({
                          ...block,
                          properties: { ...props, [key]: `${value}${unit}` },
                        });
                      }}
                      onUnitChange={(newUnit) => {
                        const value =
                          typeof props[key as keyof typeof props] === "string"
                            ? (props[key as keyof typeof props] as string).replace(/[%px]/g, "")
                            : props[key as keyof typeof props] || "0";
                        onBlockUpdate({
                          ...block,
                          properties: { ...props, [key]: `${value}${newUnit}` },
                        });
                      }}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Margin Section */}
            <div>
              <div
                className="flex items-center justify-between cursor-pointer mb-3 pb-3 border-b"
                onClick={() => toggleSection("margin")}
              >
                <span className="text-xs font-semibold text-gray-700">
                  Margin
                </span>
                {expandedSections.has("margin") ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </div>
              {expandedSections.has("margin") && (
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { key: "marginTop", label: "T" },
                    { key: "marginRight", label: "R" },
                    { key: "marginBottom", label: "B" },
                    { key: "marginLeft", label: "L" },
                  ].map(({ key, label }) => (
                    <SpacingInput
                      key={key}
                      label={label}
                      value={
                        typeof props[key as keyof typeof props] === "string" &&
                        (props[key as keyof typeof props] as string).includes("%")
                          ? (props[key as keyof typeof props] as string).replace("%", "")
                          : props[key as keyof typeof props] || "0"
                      }
                      unit={
                        typeof props[key as keyof typeof props] === "string" &&
                        (props[key as keyof typeof props] as string).includes("%")
                          ? "%"
                          : "px"
                      }
                      onValueChange={(value) => {
                        const unit =
                          typeof props[key as keyof typeof props] === "string" &&
                          (props[key as keyof typeof props] as string).includes("%")
                            ? "%"
                            : "px";
                        onBlockUpdate({
                          ...block,
                          properties: { ...props, [key]: `${value}${unit}` },
                        });
                      }}
                      onUnitChange={(newUnit) => {
                        const value =
                          typeof props[key as keyof typeof props] === "string"
                            ? (props[key as keyof typeof props] as string).replace(/[%px]/g, "")
                            : props[key as keyof typeof props] || "0";
                        onBlockUpdate({
                          ...block,
                          properties: { ...props, [key]: `${value}${newUnit}` },
                        });
                      }}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Gap Section */}
            <div>
              <div
                className="flex items-center justify-between cursor-pointer mb-3 pb-3 border-b"
                onClick={() => toggleSection("gap")}
              >
                <span className="text-xs font-semibold text-gray-700">
                  Gap (for rows/flex)
                </span>
                {expandedSections.has("gap") ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </div>
              {expandedSections.has("gap") && (
                <div className="space-y-3">
                  <NumberInput
                    label="Gap"
                    value={props.gap || "12"}
                    onChange={(value) =>
                      onBlockUpdate({
                        ...block,
                        properties: { ...props, gap: value },
                      })
                    }
                    unit="px"
                  />
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
