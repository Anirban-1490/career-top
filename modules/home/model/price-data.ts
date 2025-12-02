interface IPricingPlanProps {
  id: string;
  name: string;
  price: string;
  originalPrice?: string;
  discountedPrice?: string;
  totalPrice?: string;
  features: {
    id: string;
    label: string;
  }[];
}

export const pricingPlans: IPricingPlanProps[] = [
  {
    id: "plan_basic",
    name: "Basic Plan",
    price: "Free",
    features: [
      { id: "feat_basic_1", label: "Unlimited Resume Templates" },
      { id: "feat_basic_2", label: "Unlimited Job Autofill" },
      { id: "feat_basic_3", label: "10 Tracked Jobs" },
      { id: "feat_basic_4", label: "One FREE Resume" },
      { id: "feat_basic_5", label: "Basic Resume Keyword Matching" },
    ],
  },
  {
    id: "plan_premium",
    name: "Premium Plan",
    price: "₹199/month",
    originalPrice: "₹999",
    discountedPrice: "₹199/month",
    totalPrice: "₹299",
    features: [
      { id: "feat_premium_1", label: "Unlimited Resume Analysis" },
      { id: "feat_premium_2", label: "Unlimited Tracked Jobs" },
      { id: "feat_premium_3", label: "Unlimited AI Cover Letter Generator" },
      { id: "feat_premium_4", label: "Unlimited AI LinkedIn Post Generator" },
      { id: "feat_premium_5", label: "24/7 Email Support" },
      { id: "feat_premium_6", label: "And more!" },
    ],
  },
];
