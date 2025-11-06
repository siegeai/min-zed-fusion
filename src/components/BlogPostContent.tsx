
import { Zap } from "lucide-react";
import EmailChaosAnimation from "./EmailChaosAnimation";
import ScaleVisualization from "./ScaleVisualization";

interface BlogPostContentProps {
  excerpt: string;
}

const BlogPostContent = ({ excerpt }: BlogPostContentProps) => {
  return (
    <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed mb-8">
      <p className="text-xl font-light mb-6">{excerpt}</p>
      
      <div className="space-y-6">
        <p>Email is the most resilient, open communication protocol on the internet. No logins. No invites. No onboarding flows. Just someone typing your address and hitting send. That's magic.</p>
        
        <div className="bg-green-50/50 rounded-xl p-6 border border-green-100">
          <p className="text-lg font-medium text-green-900 mb-2">The problem isn't email.</p>
          <p className="text-green-800">It's what happens after it lands.</p>
        </div>

        <h3 className="text-2xl font-medium text-gray-900 mt-12 mb-6">The Kitchen Drawer Problem</h3>
        
        <p>Every early team runs into this. You launch something. A few people try it. Suddenly, your inbox turns into a kitchen drawer—investors, customers, bugs, applicants, ideas, spam, all dumped in the same place.</p>
        
        <EmailChaosAnimation />
        
        <p>And like a kitchen drawer, you know the good stuff is in there. Somewhere. But you have to dig through it to find what matters.</p>

        <p>So you start duct-taping a system together:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Customer issues go to a helpdesk.</li>
          <li>Sales stuff into a CRM.</li>
          <li>Everything else? Forward to Slack and hope someone picks it up.</li>
        </ul>

        <div className="bg-orange-50/50 rounded-xl p-6 border border-orange-100">
          <p className="font-medium text-orange-900">That might organize things. But it doesn't make it easier.</p>
          <p className="text-orange-800 mt-2">You're still stuck reading every email, figuring out what it is, who should handle it, what it's about, and whether it's done. That doesn't scale.</p>
        </div>

        <h3 className="text-2xl font-medium text-gray-900 mt-12 mb-6">Not a Volume Problem - a Structure Problem</h3>
        
        <p>Most tools try to help by adding structure outside the inbox. But the chaos starts inside it.</p>
        
        <p>Here's a simple test: imagine every email came in labeled, summarized, and tracked like a task. Support? Labeled. Sales lead? Labeled. Scheduling request? Pick a time. Reminder needed? Nudge sent.</p>
        
        <div className="bg-blue-50/50 rounded-xl p-6 border border-blue-100">
          <p className="text-xl font-medium text-blue-900">That would change everything.</p>
          <p className="text-blue-800 mt-2">It's not about having fewer emails. It's about making them legible.</p>
        </div>

        <h3 className="text-2xl font-medium text-gray-900 mt-12 mb-6">Why Founders Feel It First</h3>
        
        <ScaleVisualization />
        
        <p>So you reply at midnight. Or flag it "to deal with later." Or copy it to a doc you'll forget to check.</p>
        
        <div className="bg-red-50/50 rounded-xl p-6 border border-red-100">
          <p className="font-medium text-red-900">Founders don't stop replying because they don't care.</p>
          <p className="text-red-800 mt-2">They stop because it's not sustainable.</p>
        </div>

        <h3 className="text-2xl font-medium text-gray-900 mt-12 mb-6">Email Isn't Broken. It Just Needs Help.</h3>
        
        <p>The truth is, email is still the front door to your company. Not Intercom. Not Slack. Not some dashboard.</p>
        
        <p>If you want to build strong relationships with users, customers, partners—email is still where that happens.</p>
        
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-8 border border-green-200/50 text-center">
          <Zap className="w-12 h-12 text-green-600 mx-auto mb-4" />
          <p className="text-xl font-medium text-gray-900">And the first team that figures out how to keep up without falling behind wins.</p>
        </div>
      </div>
    </div>
  );
};

export default BlogPostContent;
