'use client';

import axios from 'axios';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { useCallback, useMemo, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import { useLoginModal } from '@/app/hooks/useLoginModal';
import { Modal } from './Modal';
import { Heading } from '../Heading';
import { Input } from '../inputs/Input';
import toast from 'react-hot-toast';
import { Button } from '../Button';
import { RegisterModal } from './RegisterModal';
import { useRegisterModal } from '@/app/hooks/useRegisterModal';
import { useRentModal } from '@/app/hooks/useRentModal';
import { categories } from '../Navbar/Categories';
import { CategoryInput } from '../inputs/CategoryInput';

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5
};

export const RentModal = ({}) => {
  const router = useRouter();
  const rentModal = useRentModal();
  
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(STEPS.CATEGORY);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: {
      errors,
    },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: '',
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      price: 1,
      title: '',
      description: ''
    }
  });

  const location = watch('location');
  const category = watch('category');
  const guestCount = watch('guestCount');
  const roomCount = watch('roomCount');
  const bathroomCount = watch('bathroomCount');
  const imageSrc = watch('imageSrc');
  
  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true
    });
  }

  const onBack = () => {
    setStep(v => v - 1);
  }

  const onNext = () => {
    setStep(v => v + 1);
  }

  const onSubmit = () => {};

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return 'Create';
    }
    return 'Next'
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }
    return 'Back';
  }, [step]);


  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Which of these best describes your place?"
        subtitle="Pick a category"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-auto">
        {categories.map((item) => (
          <div key={item.label} className="col-span-1">
            <CategoryInput
              onClick={(category) => setCustomValue('category', category)}
              selected={category === item.label}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  )

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div>LOCATION</div>
    )
  }
  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="How would you describe your place?"
          subtitle="Short and sweet works best!"
        />
        <Input
          id="title"
          label="Title"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <hr />
      <Input
        id="description"
        label="Description"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      </div>
    )
  }
  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Now, set your price"
          subtitle="How much do you charge per night?"
        />
        <Input
          id="price"
          label="Price"
          formatPrice
          type="number"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    )
  }
  if (step === STEPS.INFO) {
    bodyContent = (
      <div>INFO</div>
    )
  }
  if (step === STEPS.PRICE) {
    bodyContent = (
      <div>PRICE</div>
    )
  }
 
  return (
    <Modal
      disabled={isLoading}
      isOpen={rentModal.isOpen}
      title="Airbnb your home!"
      actionLabel={actionLabel}
      onSubmit={handleSubmit(onSubmit)}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      onClose={rentModal.onClose}
      body={bodyContent}
    />
  );
}