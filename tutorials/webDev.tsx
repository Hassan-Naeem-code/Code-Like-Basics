import { TutorialSection } from '@/components/Tutorials/TutorialPlayer'

export const webDevTutorial = {
  title: 'Building Web Pages',
  icon: '🌐',
  sections: [
    {
      id: 1,
      title: 'Coming Soon',
      estimatedTime: '1 min',
      content: (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🚧</div>
          <h3 className="text-2xl font-bold text-white mb-4">
            Web Development Tutorial Coming Soon!
          </h3>
          <p className="text-white/80">
            This tutorial is under construction. Check back soon for interactive web development lessons!
          </p>
        </div>
      ),
    },
  ] as TutorialSection[],
}
