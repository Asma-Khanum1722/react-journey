import { motion,useScroll } from "motion/react";
import "../src/index.css";
import Text from "./components/Text";
import Toggle from "./components/Toggle";

function App() {
  const { scrollYProgress } = useScroll();

  return (
    <>
      <motion.div
      className="fixed top-0 left-0 right-0 h-2 bg-teal-50 origin-left"
      style = {{scaleX: scrollYProgress}}
      >

      </motion.div>
      <div className="bg-linear-to-r/oklab from-indigo-500 to-teal-400 h-full flex justify-center items-center gap-6 flex-col">
        <motion.div
          className="bg-teal-50 p-18 rounded text-xl"
          animate={{
            rotate: 360,
            scale: 0.7,
            transition: { duration: 1 },
          }}
        >
          Hello
        </motion.div>
        {/* making a pop effect scale 0-1 */}
        <motion.div
          className="bg-teal-50 p-15 rounded-full text-xl"
          initial={{ scale: 0 }} //instead od setting scale to 0 we can just intial={flase}
          animate={{
            scale: 1,
            transition: { duration: 0.8 },
          }}
        >
          you
        </motion.div>

        {/* hover and tap animation */}
        <motion.div
          className="bg-teal-50 p-18 rounded text-xl"
          whileHover={{
            scale: 0.8,
            transition: { duration: 0.3 },
          }}
        >
          User
        </motion.div>

        {/* make something cool */}
        <motion.div
          className="bg-transparent p-18 rounded text-xl border-4 border-teal-50 border-dashed"
          animate={{
            rotate : [0, 360, -360, 0],
            x: [-160,120,-120,0],
          }}
          transition={{
            duration:4,
            repeat: Infinity
          }}
        ></motion.div>

        {/* create a toggle button */}
        <Toggle/>

        <Text/>

      </div>
    </>
  );
}

export default App;
