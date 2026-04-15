// https://cruip-tutorials.vercel.app/animated-gradient-border //

function BorderAnimatedContainer({ children }) {
    return (
        <div className="w-full h-full [background:linear-gradient(45deg,#172033,theme(colors.slate.800)_50%,#172033)_padding-box,conic-gradient(from_var(--border-angle),theme(colors.slate.600/.48)_0%,theme(colors.purple.500)_10%,theme(colors.slate.600/.48)_20%,theme(colors.slate.600/.48)_33%,theme(colors.amber.500)_43%,theme(colors.slate.600/.48)_53%,theme(colors.slate.600/.48)_66%,theme(colors.emerald.500)_76%,theme(colors.slate.600/.48)_86%)_border-box] rounded-2xl border-2 border-transparent animate-border flex overflow-hidden">
            {children}
        </div>
    );
}

export default BorderAnimatedContainer;