import { motion } from "framer-motion";
import { taskInfo } from "../../Utils/homeInfo";

function HomeSection02() {
  const { taskFeatures, socialCollaboration, analyticsTrust } = taskInfo;

  return (
    <div className="w-full bg-emerald-50/20 min-h-screen px-5 md:px-10 lg:px-20 py-14 relative overflow-hidden">
      {/* Colored floating background blobs */}
      <motion.div
        className="absolute -top-16 -left-12 w-44 h-44 bg-emerald-200 rounded-full blur-2xl opacity-40 -z-10"
        animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div
        className="absolute -bottom-16 -right-16 w-52 h-52 bg-blue-200 rounded-full blur-2xl opacity-40 -z-10"
        animate={{ scale: [1.1, 0.9, 1.1], opacity: [0.5, 0.7, 0.5] }}
        transition={{ duration: 7, repeat: Infinity }}
      />

      <section className="max-w-7xl mx-auto relative z-20">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 text-center leading-tight"
        >
          Empower <span className="text-blue-500">Your Team</span> with Transparent Task Management
        </motion.h2>

        {/* Sections */}
        {[taskFeatures, analyticsTrust, socialCollaboration].map(
          (section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="mt-14"
            >
              <h3 className="text-xl font-semibold text-emerald-600 mb-6 border-b border-emerald-200/70 pb-2 inline-block">
                {section.category}
              </h3>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {section.features.map((info, ind) => (
                  <InfoCard key={ind} {...info} />
                ))}
              </div>
            </motion.div>
          )
        )}
      </section>
    </div>
  );
}

function InfoCard({ icon: Icon, title, paragraph }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 200 }}
      className="bg-white/60 backdrop-blur-sm border border-emerald-200/50 rounded-lg p-5 flex flex-col gap-4"
    >
      <div className="text-3xl text-emerald-600">
        <Icon />
      </div>
      <h4 className="text-lg font-semibold text-slate-800">{title}</h4>
      <p className="text-sm text-slate-600">{paragraph}</p>
    </motion.div>
  );
}

export default HomeSection02;