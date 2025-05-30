import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User, Mail, Phone, MapPin, Edit, Save, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Profile() {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "Freelancer Pro",
    email: "freelancer@example.com",
    phone: "+90 532 123 45 67",
    address: "Istanbul, Turkey",
    bio: "Experienced full-stack developer specializing in React and Node.js applications. Passionate about creating efficient and scalable solutions for businesses.",
    company: "FreelancerDash",
    website: "https://freelancerdash.com",
    hourlyRate: "125",
    skills: "React, Node.js, TypeScript, PostgreSQL, Express"
  });

  const [editedProfile, setEditedProfile] = useState(profile);

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
    toast({
      title: "Success",
      description: "Profile updated successfully",
    });
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Profile</h2>
          <p className="text-muted-foreground">Manage your personal information</p>
        </div>
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)}>
            <Edit className="w-4 h-4 mr-2" />
            Edit Profile
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button onClick={handleSave}>
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
            <Button variant="outline" onClick={handleCancel}>
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
          </div>
        )}
      </div>

      {/* Profile Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <Avatar className="w-20 h-20">
              <AvatarFallback className="text-2xl">
                {profile.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-xl font-semibold text-foreground">{profile.name}</h3>
              <p className="text-muted-foreground">{profile.company}</p>
              <p className="text-sm text-muted-foreground">{profile.email}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                {isEditing ? (
                  <Input
                    id="name"
                    value={editedProfile.name}
                    onChange={(e) => setEditedProfile({ ...editedProfile, name: e.target.value })}
                  />
                ) : (
                  <div className="flex items-center mt-1">
                    <User className="w-4 h-4 mr-2 text-muted-foreground" />
                    <span>{profile.name}</span>
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                {isEditing ? (
                  <Input
                    id="email"
                    type="email"
                    value={editedProfile.email}
                    onChange={(e) => setEditedProfile({ ...editedProfile, email: e.target.value })}
                  />
                ) : (
                  <div className="flex items-center mt-1">
                    <Mail className="w-4 h-4 mr-2 text-muted-foreground" />
                    <span>{profile.email}</span>
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="phone">Phone</Label>
                {isEditing ? (
                  <Input
                    id="phone"
                    value={editedProfile.phone}
                    onChange={(e) => setEditedProfile({ ...editedProfile, phone: e.target.value })}
                  />
                ) : (
                  <div className="flex items-center mt-1">
                    <Phone className="w-4 h-4 mr-2 text-muted-foreground" />
                    <span>{profile.phone}</span>
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="address">Address</Label>
                {isEditing ? (
                  <Input
                    id="address"
                    value={editedProfile.address}
                    onChange={(e) => setEditedProfile({ ...editedProfile, address: e.target.value })}
                  />
                ) : (
                  <div className="flex items-center mt-1">
                    <MapPin className="w-4 h-4 mr-2 text-muted-foreground" />
                    <span>{profile.address}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="company">Company</Label>
                {isEditing ? (
                  <Input
                    id="company"
                    value={editedProfile.company}
                    onChange={(e) => setEditedProfile({ ...editedProfile, company: e.target.value })}
                  />
                ) : (
                  <div className="mt-1">
                    <span>{profile.company}</span>
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="website">Website</Label>
                {isEditing ? (
                  <Input
                    id="website"
                    value={editedProfile.website}
                    onChange={(e) => setEditedProfile({ ...editedProfile, website: e.target.value })}
                  />
                ) : (
                  <div className="mt-1">
                    <a href={profile.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      {profile.website}
                    </a>
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="hourlyRate">Hourly Rate ($)</Label>
                {isEditing ? (
                  <Input
                    id="hourlyRate"
                    value={editedProfile.hourlyRate}
                    onChange={(e) => setEditedProfile({ ...editedProfile, hourlyRate: e.target.value })}
                  />
                ) : (
                  <div className="mt-1">
                    <span>${profile.hourlyRate}/hour</span>
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="skills">Skills</Label>
                {isEditing ? (
                  <Input
                    id="skills"
                    value={editedProfile.skills}
                    onChange={(e) => setEditedProfile({ ...editedProfile, skills: e.target.value })}
                  />
                ) : (
                  <div className="mt-1">
                    <span>{profile.skills}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="bio">Bio</Label>
            {isEditing ? (
              <Textarea
                id="bio"
                value={editedProfile.bio}
                onChange={(e) => setEditedProfile({ ...editedProfile, bio: e.target.value })}
                rows={4}
              />
            ) : (
              <div className="mt-1">
                <p className="text-sm text-muted-foreground">{profile.bio}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}