"use client";

export interface GameSettings {
  randomOrder: boolean;
  strictMode: boolean;
  ignorePunctuation: boolean;
  reverseOrder: boolean;
}

interface GameSettingsProps {
  settings: GameSettings;
  onChange: (settings: GameSettings) => void;
}

export default function GameSettings({ settings, onChange }: GameSettingsProps) {
  const updateSetting = <K extends keyof GameSettings>(
    key: K,
    value: GameSettings[K]
  ) => {
    onChange({ ...settings, [key]: value });
  };

  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 space-y-4">
      <h3 className="text-lg font-semibold text-white mb-4">Game Settings</h3>
      
      <div className="space-y-3">
        {/* Random Order */}
        <label className="flex items-center justify-between cursor-pointer group">
          <div>
            <span className="text-white font-medium">Random Order</span>
            <p className="text-sm text-gray-400">Shuffle questions randomly</p>
          </div>
          <div className="relative">
            <input
              type="checkbox"
              checked={settings.randomOrder}
              onChange={(e) => updateSetting('randomOrder', e.target.checked)}
              className="sr-only"
            />
            <div
              className={`w-14 h-7 rounded-full transition-colors ${
                settings.randomOrder ? 'bg-emerald-500' : 'bg-gray-600'
              }`}
            >
              <div
                className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform ${
                  settings.randomOrder ? 'translate-x-7' : 'translate-x-1'
                } mt-0.5`}
              />
            </div>
          </div>
        </label>

        {/* Strict Mode */}
        <label className="flex items-center justify-between cursor-pointer group">
          <div>
            <span className="text-white font-medium">Strict Mode</span>
            <p className="text-sm text-gray-400">Case-sensitive matching</p>
          </div>
          <div className="relative">
            <input
              type="checkbox"
              checked={settings.strictMode}
              onChange={(e) => updateSetting('strictMode', e.target.checked)}
              className="sr-only"
            />
            <div
              className={`w-14 h-7 rounded-full transition-colors ${
                settings.strictMode ? 'bg-emerald-500' : 'bg-gray-600'
              }`}
            >
              <div
                className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform ${
                  settings.strictMode ? 'translate-x-7' : 'translate-x-1'
                } mt-0.5`}
              />
            </div>
          </div>
        </label>

        {/* Ignore Punctuation */}
        <label className="flex items-center justify-between cursor-pointer group">
          <div>
            <span className="text-white font-medium">Ignore Punctuation</span>
            <p className="text-sm text-gray-400">Ignore punctuation marks when checking</p>
          </div>
          <div className="relative">
            <input
              type="checkbox"
              checked={settings.ignorePunctuation}
              onChange={(e) => updateSetting('ignorePunctuation', e.target.checked)}
              className="sr-only"
            />
            <div
              className={`w-14 h-7 rounded-full transition-colors ${
                settings.ignorePunctuation ? 'bg-emerald-500' : 'bg-gray-600'
              }`}
            >
              <div
                className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform ${
                  settings.ignorePunctuation ? 'translate-x-7' : 'translate-x-1'
                } mt-0.5`}
              />
            </div>
          </div>
        </label>

        {/* Reverse Order */}
        <label className="flex items-center justify-between cursor-pointer group">
          <div>
            <span className="text-white font-medium">Reverse Order</span>
            <p className="text-sm text-gray-400">Answer becomes question, question becomes answer</p>
          </div>
          <div className="relative">
            <input
              type="checkbox"
              checked={settings.reverseOrder}
              onChange={(e) => updateSetting('reverseOrder', e.target.checked)}
              className="sr-only"
            />
            <div
              className={`w-14 h-7 rounded-full transition-colors ${
                settings.reverseOrder ? 'bg-emerald-500' : 'bg-gray-600'
              }`}
            >
              <div
                className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform ${
                  settings.reverseOrder ? 'translate-x-7' : 'translate-x-1'
                } mt-0.5`}
              />
            </div>
          </div>
        </label>
      </div>
    </div>
  );
}
