"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings, UserCog, LayoutDashboard } from "lucide-react";

const HomePage = () => {
  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-green-600 mb-6">
          Welcome to the Admin Control Panel
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-400 max-w-xl mx-auto mb-12">
          Manage your portfolio content, blogs, projects, and more — all from one central place.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader className="flex items-center gap-3">
              <LayoutDashboard className="w-6 h-6 text-green-600" />
              <CardTitle>Dashboard Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Quickly access all sections like blogs, projects, and settings.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader className="flex items-center gap-3">
              <UserCog className="w-6 h-6 text-green-600" />
              <CardTitle>Manage Content</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Create, update, or delete blogs and portfolio items with ease.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader className="flex items-center gap-3">
              <Settings className="w-6 h-6 text-green-600" />
              <CardTitle>Settings & Config</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Customize your site settings and admin preferences.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default HomePage;
