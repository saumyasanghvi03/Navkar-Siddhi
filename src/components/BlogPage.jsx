"use client";

import React from 'react';
import { useNav } from '../lib/navContext';

const posts = [
  {
    date: 'Feb 2026',
    tag: '🆕 Latest Update',
    title: 'Navkar Siddhi — New in This Release',
    body: `Every time a PR is merged on our GitHub, your app now refreshes automatically within seconds — no manual refresh needed. You will see a "New version available — refreshing in 3s…" pill at the top before the update applies.\n\nOther improvements in this release:\n• Aura / Neuro mode is now opt-in — it no longer auto-starts on every load.\n• The audio mute button on the top bar directly toggles the Om drone — the hidden dropdown is gone.\n• This Blog page — so you are always in the loop when something changes.`,
  },
  {
    date: 'Jan 2026',
    tag: 'Features',
    title: 'What Navkar Siddhi Can Do',
    body: `Here is a quick recap of everything the app offers:\n\n🙏 Jaap Counter — tap to count each Navkar word-by-word. Supports mala sizes of 9, 27, 36, and 108 beads.\n\n🌐 Three Languages — switch between English (Prakrit), Hindi (Devanagari), and Gujarati mid-session using the language toggle.\n\n📊 Progress Tracking — daily history, streak counter, and a visual progress grid that persists across sessions.\n\n🎯 Navkar Siddhi Tap — set a daily Navkar target and track your Tap over days and weeks.\n\n🔒 Focus / Lock Mode — hides all controls for a distraction-free full-screen jaap session.\n\n🔊 Om Drone Audio — an optional ambient Om frequency (136.1 Hz) that plays while you jaap. Tap the sound icon to start; adjust volume inline.`,
  },
  {
    date: 'Feb 2026',
    tag: 'Community',
    title: 'Introducing JainZBharat — A Tech-Driven Jain Community',
    body: `JainZBharat is a community where students and professionals come together to co-create digital projects rooted in Jain values. Whether you are a developer, designer, researcher, or simply someone who cares about Jainism, there is a role for you here.\n\nWe build real-world projects that contribute to Jainism — and help you boost your CV/Resume at the same time. This app, Navkar Siddhi, is one of those projects.\n\nJainZBharat is open to all, irrespective of religion. ✌️`,
  },
  {
    date: 'Feb 2026',
    tag: 'How It Works',
    title: 'How to Get Associated With Our Team',
    body: `Getting involved is simple:\n\n1. Join our WhatsApp group (link below).\n2. Introduce yourself — your skills, interests, and what you would like to build.\n3. Pick a project or pitch your own idea rooted in Jain culture or values.\n4. Co-create with the team, ship it, and add it to your portfolio.\n\nEvery project you contribute to is real, deployed, and used by the community.`,
  },
];

const BlogPage = () => {
  const { setPage } = useNav();

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white pt-16 pb-8 px-4">
      <div className="max-w-lg mx-auto">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-serif font-bold text-orange-900 mb-2">
            JainZ Blog
          </h1>
          <p className="text-sm text-gray-600 leading-relaxed">
            Updates, stories, and insights from the JainZBharat community.
          </p>
        </div>

        {/* WhatsApp CTA */}
        <div className="mb-8 bg-gradient-to-br from-orange-700 to-orange-900 rounded-xl p-5 text-white shadow-lg">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">⚡</span>
            <h2 className="text-sm font-bold uppercase tracking-wide">Join JainZBharat</h2>
          </div>
          <p className="text-xs text-orange-100 leading-relaxed mb-4">
            Students and professionals — join us, co-create projects that boost your CV and contribute to Jainism as a JainZ. Open to all, irrespective of religion.
          </p>
          <a
            href="https://chat.whatsapp.com/JUJxtRhHmJ0LM6Uk0OH0v5"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-orange-800 px-4 py-2 rounded-full text-xs font-bold hover:bg-orange-50 transition-colors shadow"
          >
            <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Join WhatsApp Group
          </a>
        </div>

        {/* Blog posts */}
        <div className="space-y-5">
          {posts.map((post, i) => (
            <article key={i} className="bg-white rounded-xl p-5 border border-orange-100 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-semibold uppercase tracking-widest text-orange-500 bg-orange-50 px-2 py-0.5 rounded-full">
                  {post.tag}
                </span>
                <span className="text-[10px] text-gray-400">{post.date}</span>
              </div>
              <h2 className="text-sm font-serif font-bold text-gray-900 mb-2 leading-snug">
                {post.title}
              </h2>
              <div className="space-y-2">
                {post.body.split('\n\n').map((para, j) => (
                  <p key={j} className="text-xs text-gray-600 leading-relaxed whitespace-pre-line">
                    {para}
                  </p>
                ))}
              </div>
            </article>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="mt-8 text-center space-y-3">
          <a
            href="https://chat.whatsapp.com/JUJxtRhHmJ0LM6Uk0OH0v5"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-orange-600 text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-orange-700 transition-colors shadow-md"
          >
            Join JainZBharat Community
          </a>
          <div>
            <button
              onClick={() => setPage('jaap')}
              className="text-orange-600 text-xs font-medium hover:underline"
            >
              Back to Jaap
            </button>
          </div>
          <div>
            <button
              onClick={() => setPage('privacy')}
              className="text-gray-400 text-xs hover:text-orange-600 hover:underline transition-colors"
            >
              Privacy Policy
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default BlogPage;
