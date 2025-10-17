import Doctor from '../models/Doctor.js'

export async function userToDoctorId(userId) {
  const doc = await Doctor.findOne({ userId })
  return doc ? doc._id.toString() : null
}
