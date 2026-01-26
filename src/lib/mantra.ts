export const MANTRA_LINES = [
    ["Namo", "Arihantanam"],
    ["Namo", "Siddhanam"],
    ["Namo", "Ayariyanam"],
    ["Namo", "Uvajjhayanam"],
    ["Namo", "Loye", "Savva", "Sahunam"],
    ["Eso", "Pancha", "Namukkaro"],
    ["Savva", "Pavappanasano"],
    ["Mangalanam", "Cha", "Savvesim"],
    ["Padhamam", "Havai", "Mangalam"]
];

export const MANTRA = MANTRA_LINES.flat();

export const lineWordCounts = MANTRA_LINES.map(line => line.length);

export const wordColors = {
    "Namo": "#b91c1c",
    "Arihantanam": "#1e3a8a",

    "Siddhanam": "#065f46",
    "Ayariyanam": "#78350f",
    "Uvajjhayanam": "#7e22ce",

    "Loye": "#b45309",
    "Savva": "#0f766e",
    "Sahunam": "#dc2626",

    "Eso": "#9d174d",
    "Pancha": "#1d4ed8",
    "Namukkaro": "#6d28d9",

    "Pavappanasano": "#b91c1c",

    "Mangalanam": "#1e40af",
    "Cha": "#9d174d",
    "Savvesim": "#7c3aed",

    "Padhamam": "#065f46",
    "Havai": "#b45309",
    "Mangalam": "#dc2626"
};

export const themes = [
    {
        name: "Arihant Theme",
        textColor: "#b91c1c",
        backgrounds: [
            '#fff7e6',
            '#eef2ff',
            '#e6fffa',
            '#fef3c7',
            '#faf5ff',
            '#fff4e5',
            '#e0f2fe',
            '#ffe4ec',
            '#e8edff'
        ],
        gridFill: "#b91c1c",
    },
    {
        name: "Siddha Theme",
        textColor: "#1e3a8a",
        backgrounds: [
            '#eef2ff',
            '#e6fffa',
            '#fef3c7',
            '#faf5ff',
            '#fff4e5',
            '#e0f2fe',
            '#ffe4ec',
            '#e8edff',
            '#fff7e6'
        ],
        gridFill: "#1e3a8a",
    },
    {
        name: "Acharya Theme",
        textColor: "#065f46",
        backgrounds: [
            '#e6fffa',
            '#fef3c7',
            '#faf5ff',
            '#fff4e5',
            '#e0f2fe',
            '#ffe4ec',
            '#e8edff',
            '#fff7e6',
            '#eef2ff'
        ],
        gridFill: "#065f46",
    },
    {
        name: "Upadhyay Theme",
        textColor: "#7e22ce",
        backgrounds: [
            '#faf5ff',
            '#fff4e5',
            '#e0f2fe',
            '#ffe4ec',
            '#e8edff',
            '#fff7e6',
            '#eef2ff',
            '#e6fffa',
            '#fef3c7'
        ],
        gridFill: "#7e22ce",
    },
    {
        name: "Sadhu Theme",
        textColor: "#b45309",
        backgrounds: [
            '#fff4e5',
            '#e0f2fe',
            '#ffe4ec',
            '#e8edff',
            '#fff7e6',
            '#eef2ff',
            '#e6fffa',
            '#fef3c7',
            '#faf5ff'
        ],
        gridFill: "#b45309",
    }
];
