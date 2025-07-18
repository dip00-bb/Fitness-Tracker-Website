// src/components/MembershipPlans.jsx
import React from 'react';
import { FaCheck } from 'react-icons/fa6';
import { Link } from 'react-router';

const plans = [
  {
    name: 'Basic Membership',
    price: 10,
    facilities: [
      'Access to gym facilities during regular hours',
      'Use of cardio & strength equipment',
      'Locker rooms & showers'
    ]
  },
  {
    name: 'Standard Membership',
    price: 50,
    facilities: [
      'All benefits of Basic',
      'Group fitness classes (yoga, spinning, Zumba)',
      'Access to sauna / steam room'
    ]
  },
  {
    name: 'Premium Membership',
    price: 100,
    facilities: [
      'All benefits of Standard',
      'Personal training sessions',
      'Discounts on massage & nutrition counseling'
    ]
  }
];




const MembershipTable = ({  slotId,trainerId , trainerName }) => {



  return (
    <section className="bg-[#0d0d0d] text-white py-16 px-4 md:px-16">
      <h2 className="text-4xl font-bold text-center text-lime-500 mb-12">
        Choose Your Membership
      </h2>

      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className="bg-[#1a1a1a] rounded-xl shadow-lg hover:shadow-lime-500/40 transition p-8 flex flex-col"
          >
            <h3 className="text-2xl font-bold text-lime-400 mb-4 text-center">
              {plan.name}
            </h3>

            <ul className="space-y-3 flex-1">
              {plan.facilities.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <FaCheck className="text-lime-500 mt-[3px]" />
                  <span className="text-gray-300 leading-snug">{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 text-center">
              <Link to={`/payment-page/?plan=${plan.name}&price=${plan.price}&trainerId=${trainerId}&slotId=${slotId}& trainerName=${ trainerName}`} className="inline-block bg-lime-600 px-5 py-2 rounded-full font-semibold text-lg">
                {plan.price} / mo
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MembershipTable;