'use client';

import React, { useState, ReactNode, useContext, createContext } from 'react';

import { Box, Modal } from '@mui/material';

import ProcessingCard, { ProcessingCardProps } from '../ui-kit/card-processing';

type ProcessingModalContextType = {
  openModal: (props: ProcessingCardProps) => void;
  closeModal: () => void;
};

const ProcessingModalContext = createContext<ProcessingModalContextType | undefined>(undefined);

export const ProcessingModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalProps, setModalProps] = useState<ProcessingCardProps | null>(null);

  const openModal = (props: ProcessingCardProps) => {
    setModalProps(props);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setModalProps(null);
  };

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <ProcessingModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      <Modal
        open={isOpen}
        onClose={closeModal}
        aria-labelledby="processing-modal"
        aria-describedby="processing-modal-description"
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            padding: 2,
          }}
        >
          {modalProps && <ProcessingCard {...modalProps} />}
        </Box>
      </Modal>
    </ProcessingModalContext.Provider>
  );
};

export const useProcessingModal = () => {
  const context = useContext(ProcessingModalContext);
  if (!context) {
    throw new Error('useProcessingModal must be used within a ProcessingModalProvider');
  }
  return context;
};
