import { TrilhaBanner } from '../components/trilha/TrilhaBanner';
import { TrilhaTimeline } from '../components/trilha/TrilhaTimeline';

export function Trilha() {
  return (
    <div className="flex-1 flex flex-col w-full">
      <TrilhaBanner />
      <TrilhaTimeline />
    </div>
  );
}

export default Trilha;
