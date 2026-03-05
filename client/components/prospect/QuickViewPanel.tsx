import React from "react";
import {
  Mail,
  Phone,
  Linkedin,
  MapPin,
  Download,
  MoreVertical,
  ExternalLink,
  ChevronDown,
} from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

interface Prospect {
  id: string;
  fullName: string;
  firstName: string;
  lastName: string;
  jobTitle: string;
  companyName: string;
  email: string;
  phone?: string;
  linkedinUrl?: string;
  profileImageUrl?: string;
  city?: string;
  country?: string;
  jobLevel?: string;
  jobFunction?: string;
  industry?: string;
  companySize?: string;
  revenue?: string;
  yearsAtCompany?: number;
  intentSignal?: string;
  engagementScore?: number;
}

interface QuickViewPanelProps {
  prospect: Prospect;
  onExport?: () => void;
  onTag?: () => void;
  onMoreOptions?: () => void;
  maskEmail?: (email: string) => string;
}

const defaultMaskEmail = (email: string) => {
  const [localPart, domain] = email.split("@");
  if (localPart.length <= 2) return email;
  return localPart.substring(0, 2) + "***@" + domain;
};

const getIntentSignalColor = (signal: string | undefined) => {
  if (!signal) return "";
  switch (signal.toLowerCase()) {
    case "high":
      return "bg-green-100 text-green-800 border-green-300";
    case "medium":
      return "bg-yellow-100 text-yellow-800 border-yellow-300";
    case "low":
      return "bg-gray-100 text-gray-800 border-gray-300";
    default:
      return "bg-gray-100 text-gray-800 border-gray-300";
  }
};

export const QuickViewPanel: React.FC<QuickViewPanelProps> = ({
  prospect,
  onExport,
  onTag,
  onMoreOptions,
  maskEmail = defaultMaskEmail,
}) => {
  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b z-10">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">Quick View</h2>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0"
              onClick={onMoreOptions}
            >
              <ExternalLink className="w-4 h-4 text-gray-500" />
            </Button>
          </div>

          {/* Prospect Header Card */}
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-4 -m-4 mb-4 pt-4">
            <div className="flex gap-3 items-start">
              <Avatar className="h-12 w-12 flex-shrink-0 border-2 border-orange-200">
                <AvatarImage
                  src={prospect.profileImageUrl}
                  alt={prospect.fullName}
                />
                <AvatarFallback className="bg-orange-500 text-white font-semibold">
                  {prospect.firstName[0]}
                  {prospect.lastName[0]}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-gray-900 text-base truncate">
                  {prospect.fullName}
                </h3>
                <p className="text-sm text-gray-700 truncate">
                  {prospect.jobTitle}
                </p>
                <p className="text-xs text-gray-600 truncate mt-1">
                  {prospect.companyName}
                </p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex gap-2 -m-4 px-4">
            <Button
              size="sm"
              className="flex-1 bg-orange-500 hover:bg-orange-600 text-white h-8"
              onClick={onExport}
            >
              <Download className="w-3.5 h-3.5 mr-1.5" />
              Export
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="flex-1 h-8"
              onClick={onTag}
            >
              Tag
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="w-8 h-8 p-0 flex-shrink-0"
              onClick={onMoreOptions}
            >
              <MoreVertical className="w-4 h-4 text-gray-500" />
            </Button>
          </div>
        </div>

        {/* Key Metrics - Always Visible */}
        {(prospect.intentSignal || prospect.engagementScore) && (
          <div className="px-4 py-3 bg-gray-50 border-b grid grid-cols-2 gap-3">
            {prospect.intentSignal && (
              <div className="flex flex-col items-start">
                <span className="text-xs text-gray-600 font-medium mb-1">
                  Intent
                </span>
                <Badge
                  className={cn(
                    "text-xs font-semibold",
                    getIntentSignalColor(prospect.intentSignal)
                  )}
                >
                  {prospect.intentSignal}
                </Badge>
              </div>
            )}
            {prospect.engagementScore !== undefined && (
              <div className="flex flex-col items-start">
                <span className="text-xs text-gray-600 font-medium mb-1">
                  Engagement
                </span>
                <div className="flex items-center gap-2">
                  <div className="relative w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                    <span className="text-xs font-bold text-orange-600">
                      {prospect.engagementScore}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        <Accordion type="single" collapsible defaultValue="contact" className="border-none">
          {/* Contact Details */}
          <AccordionItem value="contact" className="border-b">
            <AccordionTrigger className="px-4 py-3 hover:bg-gray-50 transition-colors data-[state=open]:bg-gray-50">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-orange-500" />
                <span className="font-semibold text-gray-900 text-sm">
                  Contact Details
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 py-3 bg-gray-50 space-y-3 text-sm">
              {/* Email */}
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-600 mb-1">Email</p>
                  <a
                    href={`mailto:${prospect.email}`}
                    className="text-orange-600 hover:text-orange-700 font-medium break-all text-xs hover:underline"
                  >
                    {maskEmail(prospect.email)}
                  </a>
                </div>
              </div>

              {/* Phone */}
              {prospect.phone && (
                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-xs text-gray-600 mb-1">Phone</p>
                    <p className="text-sm font-medium text-gray-900">
                      {prospect.phone}
                    </p>
                  </div>
                </div>
              )}

              {/* LinkedIn */}
              {prospect.linkedinUrl && (
                <div className="flex items-start gap-3">
                  <Linkedin className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-600 mb-1">LinkedIn</p>
                    <a
                      href={prospect.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-orange-600 hover:text-orange-700 font-medium text-xs hover:underline break-all"
                    >
                      View Profile
                    </a>
                  </div>
                </div>
              )}

              {/* Location */}
              {prospect.city && prospect.country && (
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-xs text-gray-600 mb-1">Location</p>
                    <p className="text-sm font-medium text-gray-900">
                      {prospect.city}, {prospect.country}
                    </p>
                  </div>
                </div>
              )}
            </AccordionContent>
          </AccordionItem>

          {/* Professional Details */}
          <AccordionItem value="professional" className="border-b">
            <AccordionTrigger className="px-4 py-3 hover:bg-gray-50 transition-colors data-[state=open]:bg-gray-50">
              <div className="flex items-center gap-2">
                <ChevronDown className="w-4 h-4 text-gray-400" />
                <span className="font-semibold text-gray-900 text-sm">
                  Professional Info
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 py-3 bg-gray-50 space-y-3 text-sm">
              {prospect.jobLevel && (
                <div>
                  <p className="text-xs text-gray-600 font-medium mb-1">Level</p>
                  <p className="text-sm text-gray-900">{prospect.jobLevel}</p>
                </div>
              )}
              {prospect.jobFunction && (
                <div>
                  <p className="text-xs text-gray-600 font-medium mb-1">
                    Function
                  </p>
                  <p className="text-sm text-gray-900">{prospect.jobFunction}</p>
                </div>
              )}
              {prospect.yearsAtCompany && (
                <div>
                  <p className="text-xs text-gray-600 font-medium mb-1">
                    Tenure
                  </p>
                  <p className="text-sm text-gray-900">
                    {prospect.yearsAtCompany} years at {prospect.companyName}
                  </p>
                </div>
              )}
            </AccordionContent>
          </AccordionItem>

          {/* Company Details */}
          <AccordionItem value="company" className="border-b">
            <AccordionTrigger className="px-4 py-3 hover:bg-gray-50 transition-colors data-[state=open]:bg-gray-50">
              <div className="flex items-center gap-2">
                <ChevronDown className="w-4 h-4 text-gray-400" />
                <span className="font-semibold text-gray-900 text-sm">
                  Company Details
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 py-3 bg-gray-50 space-y-3 text-sm">
              {prospect.industry && (
                <div>
                  <p className="text-xs text-gray-600 font-medium mb-1">
                    Industry
                  </p>
                  <p className="text-sm font-medium text-gray-900">
                    {prospect.industry}
                  </p>
                </div>
              )}
              {prospect.companySize && (
                <div>
                  <p className="text-xs text-gray-600 font-medium mb-1">Size</p>
                  <p className="text-sm font-medium text-gray-900">
                    {prospect.companySize}
                  </p>
                </div>
              )}
              {prospect.revenue && (
                <div>
                  <p className="text-xs text-gray-600 font-medium mb-1">
                    Revenue
                  </p>
                  <p className="text-sm font-medium text-gray-900">
                    {prospect.revenue}
                  </p>
                </div>
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};
