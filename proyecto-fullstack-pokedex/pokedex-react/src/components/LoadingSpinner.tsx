interface LoadingSpinnerProps {
  message?: string;
}

export default function LoadingSpinner({ message = "Cargando..." }: LoadingSpinnerProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-yellow-100 to-amber-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-orange-400 mx-auto mb-4"></div>
        <p className="text-orange-600 text-xl font-semibold">{message}</p>
      </div>
    </div>
  );
}