'use client';

import React from 'react';
import { Settings } from 'lucide-react';
import { useAppContext } from '@/context/AppContext';
import { Slider } from '@/components/ui/Slider';

export function ParametersPanel() {
    const { state, dispatch } = useAppContext();

    const updateParameter = (key: keyof typeof state.parameters, value: number) => {
        dispatch({
            type: 'SET_PARAMETERS',
            payload: { [key]: value }
        });
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center space-x-2">
                <Settings size={16} className="text-gray-600 dark:text-gray-400" />
                <h3 className="font-medium text-gray-900 dark:text-gray-100">Parameters</h3>
            </div>

            <div className="space-y-4">
                <Slider
                    label="Temperature"
                    description="Controls randomness (0 = focused, 1 = creative)"
                    value={state.parameters.temperature}
                    onChange={(value) => updateParameter('temperature', value)}
                    min={0}
                    max={1}
                    step={0.1}
                />

                <Slider
                    label="Max Tokens"
                    description="Maximum response length"
                    value={state.parameters.maxTokens}
                    onChange={(value) => updateParameter('maxTokens', value)}
                    min={100}
                    max={4000}
                    step={100}
                />

                <Slider
                    label="Top Priority "
                    description="Nucleus sampling parameter"
                    value={state.parameters.topP}
                    onChange={(value) => updateParameter('topP', value)}
                    min={0}
                    max={1}
                    step={0.1}
                />

                <Slider
                    label="Frequency Penalty"
                    description="Reduce repetition of frequent tokens"
                    value={state.parameters.frequencyPenalty}
                    onChange={(value) => updateParameter('frequencyPenalty', value)}
                    min={0}
                    max={2}
                    step={0.1}
                />

                <Slider
                    label="Presence Penalty"
                    description="Reduce repetition of any tokens"
                    value={state.parameters.presencePenalty}
                    onChange={(value) => updateParameter('presencePenalty', value)}
                    min={0}
                    max={2}
                    step={0.1}
                />
            </div>
        </div>
    );
}