import { injectable, inject } from 'tsyringe';
// import { getHours, isAfter } from 'date-fns';
import { classToClass } from 'class-transformer';

import Appointment from '@modules/Appointments/infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
  user_id: string;
  day: number;
  month: number;
  year: number;
}

@injectable()
class FindAllAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    user_id,
    year,
    month,
    day,
  }: IRequest): Promise<Appointment[]> {
    // const cacheKey = `provider-appointmentss:${user_id}:${year}-${month}-${day}`;

    let appointments;

    if (!appointments) {
      appointments = await this.appointmentsRepository.findAllInDayFromProvider(
        {
          user_id,
          year,
          month,
          day,
        },
      );
    }

    return classToClass(appointments);
  }
}

export default FindAllAppointmentService;
