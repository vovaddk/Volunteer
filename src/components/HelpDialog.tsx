import React, { useState } from 'react';
import { X, Phone, MessageCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { toast } from 'sonner';

type HelpDialogProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const HelpDialog: React.FC<HelpDialogProps> = ({ isOpen, onClose }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [name, setName] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!phoneNumber) {
      toast.error('Будь ласка, введіть номер телефону');
      return;
    }

    // Тут буде логіка відправки на сервер
    console.log('Заявка на допомогу:', { name, phoneNumber });
    
    setIsSubmitted(true);
    toast.success('Дякуємо! Ми зателефонуємо вам найближчим часом');
    
    setTimeout(() => {
      onClose();
      setIsSubmitted(false);
      setPhoneNumber('');
      setName('');
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
      <div className="relative bg-background border-2 border-[#FFD600] rounded-lg shadow-2xl max-w-md w-full p-6 animate-in zoom-in-95">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-accent transition-colors"
          aria-label="Закрити"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#FFD600] mb-4">
            <Phone className="w-8 h-8 text-[#0066FF]" />
          </div>
          <h2 className="mb-2">Можемо вам допомогти?</h2>
          <p className="text-muted-foreground">
            Залиште свій номер телефону і ми зателефонуємо вам, щоб допомогти знайти потрібне
          </p>
        </div>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Ім'я (необов'язково)</Label>
              <Input
                id="name"
                type="text"
                placeholder="Як до вас звертатись?"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="phone">Номер телефону *</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+380 XX XXX XX XX"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="mt-1"
                required
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1"
              >
                Скасувати
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-[#FFD600] text-[#0066FF] hover:bg-[#FFD600]/90"
              >
                <Phone className="w-4 h-4 mr-2" />
                Передзвоніть мені
              </Button>
            </div>
          </form>
        ) : (
          <div className="text-center py-8">
            <MessageCircle className="w-12 h-12 text-[#FFD600] mx-auto mb-4" />
            <p className="text-lg">Дякуємо! Очікуйте на дзвінок</p>
          </div>
        )}
      </div>
    </div>
  );
};
